import React from 'react';
import PostingItem from './PostingItem';
import "../css/CardItem.css"

class TermItem extends React.Component {
    render() {
        const term = this.props.term;
        const totalFrequency = this.props.totalFrequency;
        const postings = this.props.postings;
        const renderedPostingItems = postings.map((posting) => {
            return <PostingItem key={posting["recordNum"]} docId={posting["recordNum"]} frequency={posting["frequency"]}/>
        })

        return (
            <li className="list-group-item">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title card-field">{term}</h5>
                    <h6 className="card-subtitle mb-2 text-muted card-field">Total Frequency: {totalFrequency}</h6>
                    <div className="card-text">
                        {renderedPostingItems}
                    </div>
                </div>
                </div>
            </li>
        );
    }
}

export default TermItem;