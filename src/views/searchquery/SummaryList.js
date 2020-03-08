import React from 'react';
import SummaryItem from './SummaryItem';

export default function SummaryList(props) {
  const resultRecords = props.resultRecords;
  const renderedResultRecords = resultRecords.map((resultRecord) => {
    return <SummaryItem key={resultRecord["record"]["recordNum"]} score={resultRecord["score"]} record={resultRecord["record"]} />
  });
  return (
    <div>
      <ol className="list-group">
        {renderedResultRecords}
      </ol>
    </div>
  );
}