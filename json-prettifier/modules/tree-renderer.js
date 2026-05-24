function renderPrimitive(node) {
  const span = document.createElement('span');
  span.className = 'json-' + node.type;
  span.textContent = node.type === 'string' ? JSON.stringify(node.value) : String(node.value);
  return span;
}

function renderContainer(node, depth) {
  const isObject = node.type === 'object';

  const el = document.createElement('div');
  el.className = 'jpv-node';
  if (node.collapsed) el.classList.add('collapsed');

  if (depth > 0) {
    const toggle = document.createElement('span');
    toggle.className = 'jpv-toggle';
    toggle.textContent = node.collapsed ? '▶' : '▼';
    toggle.addEventListener('click', function () {
      const nowCollapsed = el.classList.toggle('collapsed');
      toggle.textContent = nowCollapsed ? '▶' : '▼';
    });
    el.appendChild(toggle);
  }

  el.appendChild(document.createTextNode(isObject ? '{' : '['));

  const count = document.createElement('span');
  count.className = 'jpv-count';
  count.textContent = isObject
    ? ' ' + node.childCount + ' }'
    : ' ' + node.childCount + ' ]';
  el.appendChild(count);

  const children = document.createElement('div');
  children.className = 'jpv-children';

  const entries = isObject
    ? node.children
    : node.children.map(function (n) { return { key: null, node: n }; });

  entries.forEach(function (entry, i) {
    const row = document.createElement('div');
    row.className = 'jpv-entry';
    if (entry.key !== null) {
      const key = document.createElement('span');
      key.className = 'json-key';
      key.textContent = JSON.stringify(entry.key) + ':';
      row.appendChild(key);
      row.appendChild(document.createTextNode(' '));
    }
    row.appendChild(renderTree(entry.node, depth + 1));
    if (i < entries.length - 1) row.appendChild(document.createTextNode(','));
    children.appendChild(row);
  });

  el.appendChild(children);

  const closer = document.createElement('span');
  closer.className = 'jpv-closer';
  closer.textContent = isObject ? '}' : ']';
  el.appendChild(closer);

  return el;
}

function renderTree(node, depth = 0) {
  if (node.type === 'object' || node.type === 'array') return renderContainer(node, depth);
  return renderPrimitive(node);
}
