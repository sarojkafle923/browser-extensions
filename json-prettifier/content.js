(function () {
  const result = isRawJsonPage(document);
  if (!result.detected) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = browser.runtime.getURL('style.css');
  document.head.appendChild(link);

  const formatted = formatJson(result.value);
  const highlighted = highlight(formatted);

  const pre = document.createElement('pre');
  pre.innerHTML = highlighted;
  document.body.replaceChildren(pre);
})();
