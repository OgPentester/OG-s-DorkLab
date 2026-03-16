import { useState } from "react";
import OperatorChip from "./OperatorChip";
import { buildDorkQuery, createEmptyOperator } from "../utils/dorkBuilder";
import { SEARCH_ENGINES, getEngineById } from "../data/searchEngines";

export default function QueryBuilder({
  operators,
  setOperators,
  selectedEngine,
  setSelectedEngine,
  onSearch,
  onSearchAll,
}) {
  const query = buildDorkQuery(operators);
  const engine = getEngineById(selectedEngine);
  const [showOperatorInfo, setShowOperatorInfo] = useState(false);

  const addOperator = () => {
    setOperators([...operators, createEmptyOperator()]);
  };

  const updateOperator = (id, updated) => {
    setOperators(operators.map((op) => (op.id === id ? { ...updated, id } : op)));
  };

  const removeOperator = (id) => {
    setOperators(operators.filter((op) => op.id !== id));
  };

  const clearAll = () => {
    setOperators([createEmptyOperator()]);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleSearchAll = () => {
    if (query.trim()) {
      onSearchAll(query);
    }
  };

  const copyQuery = () => {
    navigator.clipboard.writeText(query);
  };

  return (
    <div className="query-builder">
      <div className="builder-header">
        <h2>Query Builder</h2>
        <div className="builder-actions">
          <button className="btn btn-secondary" onClick={clearAll}>
            Clear
          </button>
          <button className="btn btn-secondary" onClick={addOperator}>
            + Add Operator
          </button>
        </div>
      </div>

      <div className="operators-list">
        {operators.map((op) => (
          <OperatorChip
            key={op.id}
            operator={op}
            onChange={(updated) => updateOperator(op.id, updated)}
            onRemove={() => removeOperator(op.id)}
          />
        ))}
      </div>

      <div className="query-preview">
        <label>Generated Query:</label>
        <div className="preview-box">
          <code>{query || "Add operators above to build your dork query..."}</code>
          {query && (
            <button className="btn btn-small" onClick={copyQuery} title="Copy to clipboard">
              Copy
            </button>
          )}
        </div>
      </div>

      <div className="engine-selector">
        <div className="engine-selector-header">
          <label>Search Engine:</label>
          <button
            className="btn btn-small"
            onClick={() => setShowOperatorInfo(!showOperatorInfo)}
            title="Show supported operators"
          >
            {showOperatorInfo ? "Hide info" : "Operator support"}
          </button>
        </div>
        <div className="engine-buttons">
          {SEARCH_ENGINES.map((eng) => (
            <button
              key={eng.id}
              className={`engine-btn ${selectedEngine === eng.id ? "active" : ""}`}
              onClick={() => setSelectedEngine(eng.id)}
              title={eng.operators}
            >
              {eng.name}
            </button>
          ))}
        </div>
        {showOperatorInfo && (
          <div className="engine-info">
            {engine.operators}
          </div>
        )}
      </div>

      <div className="search-actions">
        <button
          className="btn btn-primary search-btn"
          onClick={handleSearch}
          disabled={!query.trim()}
        >
          Search on {engine.name}
        </button>
        <button
          className="btn btn-secondary search-all-btn"
          onClick={handleSearchAll}
          disabled={!query.trim()}
          title="Open this query in all 5 search engines"
        >
          Search All
        </button>
      </div>
    </div>
  );
}
