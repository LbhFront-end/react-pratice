import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Shining from './demo.js';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const DEFAULT_HPP = '100';
const PARAM_HPP = 'hitsPerPage=';
class FormP extends Component {

  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchText: DEFAULT_QUERY,
      error: null,
    };
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(e) {
    this.setState({ searchText: e.target.value });
  }

  needsToSearchTopStories(searchText) {
    return !this.state.results[searchText];
  }

  onSearchSubmit(e) {
    const { searchText } = this.state;
    this.setState({ searchKey: searchText });

    if (this.needsToSearchTopStories(searchText)) {
      this.fetchSearchTopStories(searchText);
    }
    e.preventDefault();
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updateHits = [...oldHits, ...hits];
    this.setState({ results: { ...results, [searchKey]: { hits: updateHits, page } } });
  }

  fetchSearchTopStories(searchText, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchText}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => this.setState({ error: e }));
  }

  componentDidMount() {
    const { searchText } = this.state;
    this.setState({ searchKey: searchText });
    this.fetchSearchTopStories(searchText);
  }
  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const updateList = hits.filter(item =>
      item.objectID !== id
    );
    // this.setState({ result: Object.assign({},this.state.result,{hits:updateList}) });
    this.setState({
      results: { ...results, [searchKey]: { hits: updateList, page } }
    });
  }

  render() {
    const { searchText, results, searchKey, error } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    if (error) {
      return <p>Something went wrong.</p>
    }
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchText}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}>
            Search
          </Search>
          {
            results ?
              <Table
                list={list}
                // pattern={searchText}
                onDismiss={this.onDismiss} /> : null
          }
          <div className="interactions">
            <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>More</Button>
          </div>
        </div>
      </div>
    )
  }
}

const Button = ({ onClick, className, children }) =>
  <button
    onClick={onClick}
    className={className}
    type="button">
    {children}
  </button>

// const isSearched = searchText => item => item.title.toLowerCase().includes(searchText.toLowerCase());

const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit} >
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
  </form>

const Table = ({ list, onDismiss }) =>
  <div className="main">
    <div className="table">
      {list.map(item =>
        <div key={item.objectID} className="table-row">
          <span style={{ width: '40%' }}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={{ width: '30%' }}>{item.author}</span>
          <span style={{ width: '10%' }}>{item.num_comments}</span>
          <span style={{ width: '10%' }}>{item.points}</span>
          <span style={{ width: '10%' }}>
            <Button className="button-inline"
              onClick={() => onDismiss(item.objectID)}>
              Dismiss
          </Button>
          </span>
        </div>
      )}
    </div>
    <div>
      <Shining />
    </div>
  </div>
export default FormP;
export {
  Button,
  Search,
  Table,
};
