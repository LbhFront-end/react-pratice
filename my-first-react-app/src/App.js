import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


const list = [{
  title: 'React',
  url: 'https://facebook.github.io/react',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0,
}, {
  title: 'Redux',
  url: 'https://github.com/reactjs/redux',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1,
}];


class Button extends Component {
  render() {
    const { onClick, className, children } = this.props;
    return (
      <button
        onClick={onClick}
        className={className}
        type="button">
        {children}
      </button>
    )
  }
}

const isSearched = searchText => item => item.title.toLowerCase().includes(searchText.toLowerCase());

const Search = ({ value, onChange, children }) =>
  <form>
    {children}
    <input
      type="text"
      value={value}
      onChange={onChange} />
  </form>

const Table = ({ list, pattern, onDismiss }) =>
  <div className="table">
    {list.filter(isSearched(pattern)).map(item =>
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
class FormP extends Component {

  constructor(props) {
    super(props);
    this.state = { list, searchText: '' };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(e) {
    this.setState({ searchText: e.target.value });
  }

  onDismiss(id) {
    console.log(this);
    const updateList = this.state.list.filter(item =>
      item.objectID !== id
    );
    this.setState({ list: updateList });
  }

  render() {
    const { searchText, list } = this.state;
    return (
      <div className="page">
        <div className = "interactions">
          <Search
            value={searchText}
            onChange={this.onSearchChange} />
          <Table
            list={list}
            pattern={searchText}
            onDismiss={this.onDismiss} />
        </div>
      </div>
    )
  }
}

// class App extends Component {

//   constructor(props){
//     super(props);
//     this.state = {
//       list
//     }
//     this.onDismiss = this.onDismiss.bind(this);
//   }
//   onDismiss(id){
//     console.log(this);
//     const updateList = this.state.list.filter(item =>
//       item.objectID !== id
//     );
//     this.setState({list:updateList});
//   }

//   render() {
//     return (      
//       <div className = "App">
//         {this.state.list.map(item =>
//           <div key = {item.objectID}>
//           <span>
//             <a href= {item.url}>{item.title}</a>
//           </span>
//           <span>{item.author}</span>
//           <span>{item.num_comments}</span>
//           <span>{item.points}</span>
//           <span>
//             <button onClick = {()=>this.onDismiss(item.objectID)}>Dismiss</button>
//           </span>
//         </div>         
//         )}      
//       </div>
//     );
//   }
// }

export default FormP;

