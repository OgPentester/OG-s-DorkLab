export const SEARCH_ENGINES = [
  {
    id: "google",
    name: "Google",
    url: "https://www.google.com/search?q=",
    operators: "All operators supported: site:, inurl:, intitle:, intext:, filetype:, ext:, cache:, link:, related:",
  },
  {
    id: "bing",
    name: "Bing",
    url: "https://www.bing.com/search?q=",
    operators: "Supports: site:, inurl:, intitle:, inbody:, filetype:, feed:, contains:, loc:",
  },
  {
    id: "duckduckgo",
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
    operators: "Supports: site:, inurl:, intitle:, filetype:. No intext: (use plain keywords)",
  },
  {
    id: "yandex",
    name: "Yandex",
    url: "https://yandex.com/search/?text=",
    operators: "Supports: site:, inurl:, intitle:, mime: (instead of filetype:). Great for finding delisted content",
  },
  {
    id: "brave",
    name: "Brave",
    url: "https://search.brave.com/search?q=",
    operators: "Supports: site:, filetype:, intitle:. Independent index, less filtering than Google",
  },
];

export function getEngineById(id) {
  return SEARCH_ENGINES.find((e) => e.id === id) || SEARCH_ENGINES[0];
}
