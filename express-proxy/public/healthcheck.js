function fetchStatus(url) {
  return fetch(url)
    .then(response => response.text());
}
