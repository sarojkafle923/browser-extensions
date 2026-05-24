function isRawJsonPage(doc) {
  try {
    const value = JSON.parse(doc.body.innerText);
    return { detected: true, value };
  } catch (_) {
    return { detected: false };
  }
}

if (typeof module !== 'undefined') module.exports = { isRawJsonPage };
