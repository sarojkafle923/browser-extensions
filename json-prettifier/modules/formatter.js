function formatJson(value) {
  return JSON.stringify(value, null, 4);
}

if (typeof module !== 'undefined') module.exports = { formatJson };
