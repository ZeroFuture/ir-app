import React from 'react';
import TermItem from "./TermItem";

class TermList extends React.Component {
    render() {
        const invertedIndexes = this.props.invertedIndexes;
        const termFrequencies = this.props.termFrequencies;
        const selectedTerm = this.props.selectedTerm;

        if (!selectedTerm) {
            const terms = Object.keys(invertedIndexes);
            terms.sort();
            const renderedTerms = terms.map((term) => {
                return <TermItem key={term} term={term} totalFrequency={termFrequencies[term]} postings={invertedIndexes[term]} />
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
                        <TermItem key={selectedTerm} term={selectedTerm} totalFrequency={termFrequencies[selectedTerm]} postings={invertedIndexes[selectedTerm]}/>
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
}

export default TermList;