function applySearch(root, query) {
  const tokens = root.querySelectorAll('.json-key, .json-string, .json-number, .json-boolean, .json-null');

  tokens.forEach(function (token) {
    token.classList.remove('jpv-highlight');
  });

  if (!query) return;

  const lower = query.toLowerCase();

  tokens.forEach(function (token) {
    if (!token.textContent.toLowerCase().includes(lower)) return;

    token.classList.add('jpv-highlight');

    let ancestor = token.parentElement;
    while (ancestor && ancestor !== root) {
      if (ancestor.classList.contains('jpv-node') && ancestor.classList.contains('collapsed')) {
        ancestor.classList.remove('collapsed');
        const toggle = ancestor.querySelector(':scope > .jpv-toggle');
        if (toggle) toggle.textContent = '▼';
      }
      ancestor = ancestor.parentElement;
    }
  });
}
