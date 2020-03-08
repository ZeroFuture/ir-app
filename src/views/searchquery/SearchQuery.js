import React, { useState } from 'react';
import SearchBar from '../SearchBar';
import irCore from 'apis/irCore';
import SummaryList from './SummaryList';
import "css/SearchQuery.css";



export default function SearchQuery(props) {
  const [query, setQuery] = useState('');
  const [resultRecords, setResultRecords] = useState();
  const [searchTime, setSearchTime] = useState(0);

  const onQuerySubmit = (query) => {
    console.log("Searched: " + query);
    setQuery(query);
    const data = new FormData();
    data.append('query', query);
    console.log("start sending request to server");
    irCore.post('/search', data).then((response) => {
      console.log("Successfully received response from server");
      if (response.data.resultRecords.length > 20) {
        setResultRecords(response.data.resultRecords.slice(0, 20));
      } else {
        setResultRecords(response.data.resultRecords);
      }
      setSearchTime(response.data.searchTime);
    }).catch(function (error) {
      console.log(error);
      if (error.response) {
          //HTTP error happened
          console.log("Upload error. HTTP error/status code=", error.response.status);
      } else {
          //some other error happened
          console.log("Upload error. HTTP error/status code=", error.message);
      }
    });
  }

  const querySummary = () => {
    if (query && resultRecords) {
      if (!resultRecords.length) {
        return (
          <div className="summary-text roboto-light">
            No record found against collection, please try another query.
          </div>
        );
      } else {
        return (
          <div className="summary-text roboto-light">
            Search time: {searchTime} s
          </div>
        );
      }
    }
  }

  return (
    <div className="block">
      <SearchBar onSubmit={onQuerySubmit} searchText="Search a query: "/>
      <div>
        {querySummary()}
        <SummaryList resultRecords={resultRecords}/>
      </div>
    </div>
  )
}