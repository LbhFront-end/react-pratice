import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Shining from './demo.js';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchText}`;

// const list = [{
//   title: 'React',
//   url: 'https://facebook.github.io/react',
//   author: 'Jordan Walke',
//   num_comments: 3,
//   points: 4,
//   objectID: 0,
// }, {
//   title: 'Redux',
//   url: 'https://github.com/reactjs/redux',
//   author: 'Dan Abramov, Andrew Clark',
//   num_comments: 2,
//   points: 5,
//   objectID: 1,
// }];

class FormP extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchText: DEFAULT_QUERY,
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(e) {
    // console.log( e.target.value);
    this.setState({ searchText: e.target.value });
  }

  onSearchSubmit(e) {
    const { searchText } = this.state;
    // console.log( searchText);
    this.fetchSearchTopStories(searchText);
    e.preventDefault();
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  fetchSearchTopStories(searchText) {
    // console.log(url);
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchText}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }
  componentDidMount() {
    const { searchText } = this.state;
    this.fetchSearchTopStories(searchText);
  }
  onDismiss(id) {
    // console.log(this);
    // console.log(this.state.result);
    const updateList = this.state.result.hits.filter(item =>
      item.objectID !== id
    );
    // this.setState({ result: Object.assign({},this.state.result,{hits:updateList}) });
    this.setState({
      result: { ...this.state.result, hits: updateList }
    });
  }

  render() {
    const { searchText, result } = this.state;
    if (!result) {
      return null;
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
            result ?
              <Table
                list={result.hits}
                // pattern={searchText}
                onDismiss={this.onDismiss} /> : null
          }
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

