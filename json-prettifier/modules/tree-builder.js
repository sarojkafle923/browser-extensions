function buildTree(value, depth = 0) {
  if (value === null) {
    return { type: 'null', value: null, children: null, childCount: null, collapsed: false };
  }

  const type = typeof value;

  if (type === 'string' || type === 'number' || type === 'boolean') {
    return { type, value, children: null, childCount: null, collapsed: false };
  }

  const collapsed = depth > 1;

  if (Array.isArray(value)) {
    const children = value.map(item => buildTree(item, depth + 1));
    return { type: 'array', value, children, childCount: value.length, collapsed };
  }

  const children = Object.entries(value).map(([key, val]) => ({ key, node: buildTree(val, depth + 1) }));
  return { type: 'object', value, children, childCount: children.length, collapsed };
}

if (typeof module !== 'undefined') module.exports = { buildTree };
