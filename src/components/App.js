import React, { Component } from 'react';
import InvertedIndexer from '../apis/InvertedIndexer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import SearchBar from './SearchBar';
import TermList from './TermList';
import HeaderImg from '../images/header-image.png';
import "../css/App.css";

export class App extends Component {
  state = { 
    file: '',
    fileName: "Choose a file",
    termFrequencies: {
      "sample": 2
    },
    invertedIndexes: {
      "sample": [
        {
          "term": "sample", 
          "recordNum": "xxxx1",
          "frequency": 1
        }, 
        {
          "term": "sample", 
          "recordNum": "xxxx2",
          "frequency": 1
        }
      ]
    },
    indexingTime: 0,
    memoryUsage: 0,
    selectedTerm: ''
  }

  onUploadFile = (event) => {
    console.log("Uploading file");
    if (event.target.files[0]) {
      this.setState({
        file: event.target.files[0],
        fileName: event.target.files[0].name
      });
      console.log("File uploaded");
    }
  };

  onSubmit = () => {
    if (!this.state.file) {
        console.log("No file uploaded")
    } else {
        const data = new FormData();
        //using File API to get chosen file
        data.append('file', this.state.file);
        data.append('name', 'xml_file');
        data.append('description', 'file to be indexed');
        //calling async Promise and handling response or error situation
        console.log("start sending request to server");
        InvertedIndexer.post('/upload', data).then((response) => {
            console.log("Successfully received response from server");
            this.setState({
                termFrequencies: response.data.termFrequencies,
                invertedIndexes: response.data.invertedIndexes,
                indexingTime: response.data.indexingTime,
                memoryUsage: response.data.memoryUsage,
                selectedTerm: ''
            });
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
  };

  onTermSubmit = (term) => {
    console.log("Searched: " + term);
    this.setState({selectedTerm: term});
  }

  render() {
    return (
      <div>
        <div className="block header">
          <img className="header-image" src={HeaderImg} alt="header" />
          <div>
            <span className="ir-text">
              IR stands for Infinite Rolling.
            </span>
          </div>
          <div>
            <span className="ir-text ir-text-small">
              -Anonymous dude who lost a finger while searching for a term
            </span>
          </div>
        </div>

        <div className="block">
          <div className="upload">
            <FontAwesomeIcon icon={faCloudUploadAlt} />
            <span className="upload-text">Upload a XML formatted record file: </span>
          </div>
          <div className="input-group">
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="inputGroupFile" aria-describedby="inputGroupFileAddon" onChange={this.onUploadFile}/>
              <label className="custom-file-label" htmlFor="inputGroupFile">
                {this.state.fileName}
              </label>
            </div>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon" onClick={this.onSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="block">
          <SearchBar onSubmit={this.onTermSubmit} />
        </div>

        <div className="block">
          <div className="postings">
            <span className="postings-text">
              Indexing time for uploaded file: {this.state.indexingTime} seconds
            </span>
          </div>
          <div className="postings"> 
            <span className="postings-text">
              Memory usage for uploaded file: {this.state.memoryUsage} kb
            </span>
          </div>
          <div className="postings">
            <span className="postings-text">
              Posting list for uploaded file: 
            </span>
          </div>
          <TermList termFrequencies={this.state.termFrequencies} invertedIndexes={this.state.invertedIndexes} selectedTerm={this.state.selectedTerm}/>
        </div>
      </div>
    );
  }
}

export default App;