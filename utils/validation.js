const isValidUrl = (url) => {
  const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9-]*\.[a-zA-Z0-9]*\b([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)#?/;
  return urlRegex.test(url);
};

module.exports = {
  isValidUrl,
};
