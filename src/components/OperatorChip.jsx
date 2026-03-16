import { OPERATORS } from "../utils/dorkBuilder";

export default function OperatorChip({ operator, onChange, onRemove }) {
  return (
    <div className="operator-chip">
      <button
        className={`exclude-toggle ${operator.exclude ? "active" : ""}`}
        onClick={() => onChange({ ...operator, exclude: !operator.exclude })}
        title={operator.exclude ? "Excluding (click to include)" : "Including (click to exclude)"}
      >
        {operator.exclude ? "NOT" : "+"}
      </button>

      <select
        value={operator.type}
        onChange={(e) => onChange({ ...operator, type: e.target.value })}
        className="operator-select"
      >
        {OPERATORS.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={operator.value}
        onChange={(e) => onChange({ ...operator, value: e.target.value })}
        placeholder={OPERATORS.find((o) => o.value === operator.type)?.description || "Enter value..."}
        className="operator-input"
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      />

      <button className="remove-btn" onClick={onRemove} title="Remove operator">
        &times;
      </button>
    </div>
  );
}
