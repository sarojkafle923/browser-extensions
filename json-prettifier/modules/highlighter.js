function highlight(json) {
  const safe = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return safe.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      if (/^"/.test(match)) {
        if (/:$/.test(match)) return '<span class="json-key">' + match + '</span>';
        return '<span class="json-string">' + match + '</span>';
      }
      if (/true|false/.test(match)) return '<span class="json-boolean">' + match + '</span>';
      if (/null/.test(match)) return '<span class="json-null">' + match + '</span>';
      return '<span class="json-number">' + match + '</span>';
    }
  );
}

if (typeof module !== 'undefined') module.exports = { highlight };
