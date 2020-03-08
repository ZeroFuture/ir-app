import React from 'react';

export default function PostingItem(props) {
  const docId = props.docId;
  const frequency = props.frequency;

  return (
    <div className="card-field">
      <span className="card-field roboto-xlight">
        docId: {docId}
      </span>
      <span className="card-field roboto-xlight">
        frequency: {frequency}
      </span>
    </div>
  );
}