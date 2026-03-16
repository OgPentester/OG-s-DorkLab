import { useState } from "react";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "../data/templates";
import { createEmptyOperator } from "../utils/dorkBuilder";

export default function TemplatePanel({ onApplyTemplate }) {
  const [activeCategory, setActiveCategory] = useState(TEMPLATE_CATEGORIES[0]);
  const [targetDomain, setTargetDomain] = useState("");

  const applyTemplate = (template) => {
    const operators = template.operators.map((op) => ({
      ...op,
      id: crypto.randomUUID(),
    }));

    if (targetDomain.trim()) {
      const hasSite = operators.some((op) => op.type === "site");
      if (!hasSite) {
        operators.unshift({
          id: crypto.randomUUID(),
          type: "site",
          value: targetDomain.trim(),
          exclude: false,
        });
      }
    }

    onApplyTemplate(operators);
  };

  const filtered = TEMPLATES.filter((t) => t.category === activeCategory);

  return (
    <div className="template-panel">
      <h2>Templates</h2>

      <div className="target-domain">
        <label>Target Domain (optional):</label>
        <input
          type="text"
          value={targetDomain}
          onChange={(e) => setTargetDomain(e.target.value)}
          placeholder="example.com"
          className="domain-input"
        />
      </div>

      <div className="category-tabs">
        {TEMPLATE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-tab ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="template-list">
        {filtered.map((template, i) => (
          <div
            key={i}
            className="template-card"
            onClick={() => applyTemplate(template)}
          >
            <div className="template-name">{template.name}</div>
            <div className="template-desc">{template.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
