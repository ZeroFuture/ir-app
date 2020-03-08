import React, { useState } from 'react';
import irCore from 'apis/irCore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import SearchBar from '../SearchBar';
import TermList from './TermList';
import "css/IndexFile.css";

export default function IndexFile(props) {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState("Choose a file");
  const [indexingTime, setIndexingTime] = useState(0.0);
  const [memoryUsage, setMemoryUsage] = useState(0.0);
  const [selectedTerm, setSelectedTerm] = useState('');
  const [invertedIndexes, setInvertedIndexes] = useState({
    "sample": {
      "documentFrequency": 2,
      "termFrequency": 2,
      "postings": [
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
    }
  });

  const onUploadFile = (event) => {
    console.log("Uploading file");
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
      console.log("File uploaded");
    }
  };

  const onSubmit = () => {
    if (!file) {
        console.log("No file uploaded")
    } else {
        const data = new FormData();
        //using File API to get chosen file
        data.append('file', file);
        data.append('name', 'xml_file');
        data.append('description', 'file to be indexed');
        //calling async Promise and handling response or error situation
        console.log("start sending request to server");
        irCore.post('/upload', data).then((response) => {
            setInvertedIndexes(response.data.invertedIndexes);
            setIndexingTime(response.data.indexingTime);
            setMemoryUsage(response.data.memoryUsage);
            setSelectedTerm('');
            console.log("Successfully received response from server");
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

  const onTermSubmit = (term) => {
    console.log("Searched: " + term);
    setSelectedTerm(term);
  }

  return (
    <div>
      <div className="block">
        <div className="upload">
          <FontAwesomeIcon icon={faCloudUploadAlt} />
          <span className="upload-text roboto-light">Upload a XML formatted record file: </span>
        </div>
        <div className="input-group">
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="inputGroupFile" aria-describedby="inputGroupFileAddon" onChange={onUploadFile}/>
            <label className="custom-file-label roboto-light" htmlFor="inputGroupFile">
              {fileName}
            </label>
          </div>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary roboto-light" type="button" id="inputGroupFileAddon" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="block">
        <SearchBar onSubmit={onTermSubmit} searchText="Search for a term: "/>
      </div>

      <div className="block">
        <div className="postings postings-text roboto-light">
          Indexing time for uploaded file: {indexingTime} seconds
        </div>
        <div className="postings postings-text roboto-light"> 
          Memory usage for uploaded file: {memoryUsage} kb
        </div>
        <div className="postings postings-text roboto-light">
          Posting list for uploaded file: 
        </div>
        <TermList invertedIndexes={invertedIndexes} selectedTerm={selectedTerm}/>
      </div>
    </div>
  );
}