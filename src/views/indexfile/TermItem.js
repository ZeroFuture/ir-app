import React from 'react';
import PostingItem from './PostingItem';
import "css/TermItem.css"

export default function TermItem(props) {
    const term = props.term;
    const totalFrequency = props.totalFrequency;
    const postings = props.postings;
    const renderedPostingItems = postings.map((posting) => {
        return <PostingItem key={posting["recordNum"]} docId={posting["recordNum"]} frequency={posting["frequency"]}/>
    })

    return (
        <li className="list-group-item">
            <div className="card">
            <div className="card-body">
                <h5 className="card-title card-field roboto-light">{term}</h5>
                <h6 className="card-subtitle mb-2 text-muted card-field roboto-xlight">Total Frequency: {totalFrequency}</h6>
                <div className="card-text">
                    {renderedPostingItems}
                </div>
            </div>
            </div>
        </li>
    );
}