import { useState, useEffect } from "react";

export default function SettingsModal({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState("");
  const [cx, setCx] = useState("");

  useEffect(() => {
    if (isOpen) {
      setApiKey(localStorage.getItem("dorklab_api_key") || "");
      setCx(localStorage.getItem("dorklab_cx") || "");
    }
  }, [isOpen]);

  const save = () => {
    localStorage.setItem("dorklab_api_key", apiKey);
    localStorage.setItem("dorklab_cx", cx);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Google API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Google API key"
              className="settings-input"
            />
          </div>

          <div className="form-group">
            <label>Custom Search Engine ID (CX)</label>
            <input
              type="text"
              value={cx}
              onChange={(e) => setCx(e.target.value)}
              placeholder="Enter your Search Engine ID"
              className="settings-input"
            />
          </div>

          <div className="settings-help">
            <h3>Setup Instructions</h3>
            <ol>
              <li>Go to the Google Cloud Console and create a project</li>
              <li>Enable the "Custom Search JSON API"</li>
              <li>Create an API key under Credentials</li>
              <li>Go to Programmable Search Engine and create a search engine</li>
              <li>Set it to search the entire web</li>
              <li>Copy the Search Engine ID (CX)</li>
            </ol>
            <p className="quota-note">Free tier: 100 queries/day</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}
