function formatJson(value) {
  return JSON.stringify(value, null, 2);
}

if (typeof module !== 'undefined') module.exports = { formatJson };
