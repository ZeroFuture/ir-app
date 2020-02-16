import React from 'react';
import "./CardItem.css";

class PostingItem extends React.Component {
  render() {
    const docId = this.props.docId;
    const frequency = this.props.frequency;

    return (
      <div className="card-field">
        <span className="card-field">
          docId: {docId}
        </span>
        <span className="card-field">
          frequency: {frequency}
        </span>
      </div>
    );
  }
}

export default PostingItem;