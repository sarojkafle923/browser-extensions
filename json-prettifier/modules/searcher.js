function applySearchHighlight(highlightedHtml, query) {
  if (!query) return highlightedHtml;
  const lower = query.toLowerCase();
  return highlightedHtml.replace(
    /<span class="([^"]+)">([^<]+)<\/span>/g,
    function (match, classes, text) {
      if (text.toLowerCase().includes(lower)) {
        return `<span class="${classes} jpv-highlight">${text}</span>`;
      }
      return match;
    }
  );
}

if (typeof module !== 'undefined') module.exports = { applySearchHighlight };
