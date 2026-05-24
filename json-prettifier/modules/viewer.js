function formatByteSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function buildViewerHTML(url, formattedJson) {
  const size = formatByteSize((formattedJson || '').length);
  return `<div class="json-prettifier-viewer">`
    + `<div class="jpv-toolbar">`
    + `<span class="jpv-url">${url || ''}</span>`
    + `<span class="jpv-size">${size}</span>`
    + `<button class="jpv-copy">Copy</button>`
    + `<input class="jpv-search" type="text" placeholder="Search keys and values…" />`
    + `</div>`
    + `<div class="jpv-tree"></div>`
    + `</div>`;
}

if (typeof module !== 'undefined') module.exports = { formatByteSize, buildViewerHTML };
