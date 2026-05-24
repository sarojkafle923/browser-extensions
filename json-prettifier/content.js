(function () {
  const result = isRawJsonPage(document);
  if (!result.detected) return;

  const formatted = formatJson(result.value);
  const highlighted = highlight(formatted);

  const pre = document.createElement('pre');
  pre.innerHTML = highlighted;
  document.body.replaceChildren(pre);
})();
