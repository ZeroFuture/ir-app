import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import "css/IndexSearchBar.css"

export default function SearchBar(props) {
  const [term, setTerm] = useState('');

  const onInputChange = (event) => {
    setTerm(event.target.value);
  }

  const onFormSubmit = (event) => {
      event.preventDefault();
      props.onSubmit(term);
  }

  return (
      <div className="search-bar">
        <form className="form-group lg-form form-lg" onSubmit={onFormSubmit}>
          <div> 
            <FontAwesomeIcon icon={faSearch} />
            <span className="search-text roboto-light">{props.searchText}</span>
            <input className="form-control input-lg roboto-light" 
            type="text" placeholder="Search" aria-label="Search"
            value={term}
            onChange={onInputChange}/>
          </div>
        </form>
      </div>
  );
}