import React, { Component } from 'react';
import InvertedIndexer from '../apis/InvertedIndexer';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import "./FileUploader.css";

export class FileUploader extends Component {
    state = { 
        file: '',
        response: ''
    }

    onUploadFile = (event) => {
        console.log("Uploading file");
        this.setState({file: event.target.files[0]});
        console.log("File uploaded");
    };

    onSubmit = () => {
        if (!this.state.file) {
            console.log("No file uploaded")
        } else {
            const data = new FormData();
            //using File API to get chosen file
            console.log("file: " + this.state.file);
            data.append('file', this.state.file);
            data.append('name', 'xml_file');
            data.append('description', 'file to be indexed');
            //calling async Promise and handling response or error situation
            console.log("start sending request to server");
            InvertedIndexer.post('/upload', data).then((response) => {
                this.setState({response: response});
                console.log("Response from server: " + response);})
            .catch(function (error) {
                console.log(error);
                if (error.response) {
                    //HTTP error happened
                    console.log("Upload error. HTTP error/status code=",error.response.status);
                } else {
                    //some other error happened
                   console.log("Upload error. HTTP error/status code=",error.message);
                }
            });
        }
    };

    render() {
        return (
            <div className="invertedIndexField">
                <Input type="file" onChange={this.onUploadFile}>Choose a file</Input>
                <Button onClick={this.onSubmit}>Submit</Button>
                <div>{this.state.response.data}</div>
            </div>
        )
    };
}