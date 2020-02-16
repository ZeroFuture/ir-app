import React, { Component } from 'react';
import {FileUploader} from './FileUploader.js';

export class App extends Component {
  render(){
    return (
      <div className="invertedIndexField">
        <FileUploader/>
      </div>
    );
  }
}

export default App;