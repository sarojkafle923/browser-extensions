function buildViewerHTML(highlightedHtml) {
  return '<div class="json-prettifier-viewer"><pre>' + highlightedHtml + '</pre></div>';
}

if (typeof module !== 'undefined') module.exports = { buildViewerHTML };
