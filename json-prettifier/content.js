(function () {
  const result = isRawJsonPage(document);
  if (!result.detected) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = browser.runtime.getURL('style.css');
  document.head.appendChild(link);

  const formatted = formatJson(result.value);
  const tree = buildTree(result.value);

  const viewer = document.createElement('div');
  viewer.innerHTML = buildViewerHTML(location.href, formatted);
  const root = viewer.firstElementChild;

  root.querySelector('.jpv-copy').addEventListener('click', function (e) {
    const btn = e.currentTarget;
    navigator.clipboard.writeText(formatted).then(function () {
      btn.textContent = 'Copied!';
      setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
    });
  });

  root.querySelector('.jpv-tree').appendChild(renderTree(tree));

  document.body.replaceChildren(root);
})();
