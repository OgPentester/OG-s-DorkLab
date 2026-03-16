export const OPERATORS = [
  { value: "site", label: "site:", description: "Restrict to domain" },
  { value: "inurl", label: "inurl:", description: "Keyword in URL" },
  { value: "intitle", label: "intitle:", description: "Keyword in title" },
  { value: "intext", label: "intext:", description: "Keyword in body" },
  { value: "filetype", label: "filetype:", description: "File extension" },
  { value: "ext", label: "ext:", description: "File extension (alias)" },
  { value: "cache", label: "cache:", description: "Cached version" },
  { value: "link", label: "link:", description: "Pages linking to URL" },
  { value: "related", label: "related:", description: "Related sites" },
  { value: "info", label: "info:", description: "Info about URL" },
  { value: "allintitle", label: "allintitle:", description: "All words in title" },
  { value: "allinurl", label: "allinurl:", description: "All words in URL" },
  { value: "allintext", label: "allintext:", description: "All words in body" },
  { value: "keyword", label: "keyword", description: "Plain search term" },
  { value: "exact", label: '\"exact\"', description: "Exact phrase match" },
];

export function buildDorkQuery(operators) {
  const parts = [];

  for (const op of operators) {
    if (!op.value || !op.value.trim()) continue;

    const val = op.value.trim();
    const prefix = op.exclude ? "-" : "";

    switch (op.type) {
      case "keyword":
        parts.push(`${prefix}${val}`);
        break;
      case "exact":
        parts.push(`${prefix}"${val}"`);
        break;
      default:
        parts.push(`${prefix}${op.type}:${val}`);
        break;
    }
  }

  return parts.join(" ");
}

export function createEmptyOperator() {
  return {
    id: crypto.randomUUID(),
    type: "site",
    value: "",
    exclude: false,
  };
}
