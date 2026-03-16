import { invoke } from "@tauri-apps/api/core";

export default function ResultsPanel({ results, error }) {
  const openUrl = async (url) => {
    try {
      await invoke("open_url", { url });
    } catch (e) {
      window.open(url, "_blank");
    }
  };

  if (error) {
    return (
      <div className="results-panel">
        <div className="results-error">
          <span className="error-icon">!</span>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!results) return null;

  return (
    <div className="results-panel">
      <div className="results-header">
        <span className="result-count">
          {results.total_results} results ({results.search_time.toFixed(2)}s)
        </span>
      </div>

      {results.results.length === 0 ? (
        <div className="no-results">No results found.</div>
      ) : (
        <div className="results-list">
          {results.results.map((result, i) => (
            <div key={i} className="result-item" onClick={() => openUrl(result.link)}>
              <div className="result-url">{result.link}</div>
              <div className="result-title">{result.title}</div>
              <div className="result-snippet">{result.snippet}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
