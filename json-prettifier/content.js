(function () {
  const result = isRawJsonPage(document);
  if (!result.detected) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = browser.runtime.getURL('style.css');
  document.head.appendChild(link);

  const formatted = formatJson(result.value);
  const highlighted = highlight(formatted);

  const viewer = document.createElement('div');
  viewer.innerHTML = buildViewerHTML(highlighted);
  document.body.replaceChildren(viewer.firstElementChild);
})();
