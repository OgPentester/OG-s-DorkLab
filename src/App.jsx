import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import QueryBuilder from "./components/QueryBuilder";
import TemplatePanel from "./components/TemplatePanel";
import { createEmptyOperator } from "./utils/dorkBuilder";
import { SEARCH_ENGINES, getEngineById } from "./data/searchEngines";

export default function App() {
  const [operators, setOperators] = useState([createEmptyOperator()]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedEngine, setSelectedEngine] = useState("google");

  const openUrl = async (url) => {
    try {
      await invoke("open_url", { url });
    } catch (e) {
      window.open(url, "_blank");
    }
  };

  const handleSearch = async (query, engineId) => {
    const engine = getEngineById(engineId || selectedEngine);
    const url = `${engine.url}${encodeURIComponent(query)}`;
    await openUrl(url);
    setSearchHistory((prev) => [
      { query, engine: engine.name, timestamp: new Date().toLocaleTimeString() },
      ...prev.slice(0, 19),
    ]);
  };

  const handleSearchAll = async (query) => {
    for (const engine of SEARCH_ENGINES) {
      const url = `${engine.url}${encodeURIComponent(query)}`;
      await openUrl(url);
    }
    setSearchHistory((prev) => [
      { query, engine: "All", timestamp: new Date().toLocaleTimeString() },
      ...prev.slice(0, 19),
    ]);
  };

  const handleApplyTemplate = (templateOps) => {
    setOperators(templateOps);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle templates"
          >
            {sidebarOpen ? "\u25C0" : "\u25B6"}
          </button>
          <h1 className="app-title">
            <span className="title-og">OG's </span>
            <span className="title-dork">Dork</span>
            <span className="title-lab">Lab:</span>
          </h1>
        </div>
        <span className="header-badge">OSINT</span>
      </header>

      <div className="app-body">
        {sidebarOpen && (
          <aside className="sidebar">
            <TemplatePanel onApplyTemplate={handleApplyTemplate} />
          </aside>
        )}

        <main className="main-content">
          <QueryBuilder
            operators={operators}
            setOperators={setOperators}
            selectedEngine={selectedEngine}
            setSelectedEngine={setSelectedEngine}
            onSearch={handleSearch}
            onSearchAll={handleSearchAll}
          />

          {searchHistory.length > 0 && (
            <div className="history-panel">
              <div className="history-header">
                <h2>Recent Searches</h2>
                <button
                  className="btn btn-secondary"
                  onClick={() => setSearchHistory([])}
                >
                  Clear
                </button>
              </div>
              <div className="history-list">
                {searchHistory.map((item, i) => (
                  <div
                    key={i}
                    className="history-item"
                    onClick={() => handleSearch(item.query)}
                  >
                    <code>{item.query}</code>
                    <div className="history-meta">
                      <span className="history-engine">{item.engine}</span>
                      <span className="history-time">{item.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
