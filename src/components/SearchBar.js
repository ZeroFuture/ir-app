import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import "./SearchBar.css"

class SearchBar extends React.Component {
  state = { term: '' };
  onInputChange = (event) => {
      this.setState({term: event.target.value});
  }

  onFormSubmit = (event) => {
      event.preventDefault();
      this.props.onSubmit(this.state.term);
  }

  render() {
    return (
        <div className="search-bar">
          <form className="form-group lg-form form-lg" onSubmit={this.onFormSubmit}>
            <div> 
              <FontAwesomeIcon icon={faSearch} />
              <span className="search-text">Search for a term: </span>
              <input className="form-control input-lg" 
              type="text" placeholder="Search" aria-label="Search"
              value={this.state.term}
              onChange={this.onInputChange}/>
            </div>
          </form>
        </div>
    );
  } 
}

export default SearchBar; 