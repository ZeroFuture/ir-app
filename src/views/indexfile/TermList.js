import React from 'react';
import TermItem from "./TermItem";

export default function TermList(props) {
    const invertedIndexes = props.invertedIndexes;
    const selectedTerm = props.selectedTerm;

    if (!selectedTerm) {
        const terms = Object.keys(invertedIndexes);
        terms.sort();
        const renderedTerms = terms.map((term) => {
            return <TermItem key={term} term={term} totalFrequency={invertedIndexes[term]["termFrequency"]} postings={invertedIndexes[term]["postings"]} />
        });

        return (
            <div>
                <ol className="list-group">
                    {renderedTerms}
                </ol>
            </div>
        );
    } else if (invertedIndexes[selectedTerm]) {
        return (
            <div>
                <ol className="list-group">
                    <TermItem key={selectedTerm} term={selectedTerm} totalFrequency={invertedIndexes[selectedTerm]["termFrequency"]} postings={invertedIndexes[selectedTerm]["postings"]}/>
                </ol>
            </div>
        );
    } else {
        return (
            <div>
                <ol className="list-group">
                    <TermItem key={selectedTerm} term={selectedTerm} totalFrequency={0} postings={[]}/>
                </ol>
            </div>
        );
    }
}