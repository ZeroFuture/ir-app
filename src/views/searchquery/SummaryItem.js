import React from 'react';
import "css/SummaryItem.css";

export default function SummaryItem(props) {
  const score = props.score;
  const title = props.record["title"];
  const source = props.record["source"];
  const recordNum = props.record["recordNum"];
  const content = props.record["content"];

  return (
    <div>
      <li className="list-group-item">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title card-field roboto-light">
              {title}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted card-field roboto-xlight">
              {source}
            </h6>
            <div className="record-subinfo">
              <h6 className="card-subtitle mb-2 text-muted card-field roboto-xlight">
                record number: {recordNum}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted card-field roboto-xlight">
                ranking score: {score}
              </h6>
            </div>
            <div className="card-text roboto-xlight">
              {content}
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}