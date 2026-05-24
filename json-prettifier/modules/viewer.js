function formatByteSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function buildViewerHTML(highlightedHtml, url, formattedJson) {
  const size = formatByteSize((formattedJson || '').length);
  return `<div class="json-prettifier-viewer">`
    + `<div class="jpv-toolbar">`
    + `<span class="jpv-url">${url || ''}</span>`
    + `<span class="jpv-size">${size}</span>`
    + `<button class="jpv-copy">Copy</button>`
    + `</div>`
    + `<pre>${highlightedHtml}</pre>`
    + `</div>`;
}

if (typeof module !== 'undefined') module.exports = { formatByteSize, buildViewerHTML };
