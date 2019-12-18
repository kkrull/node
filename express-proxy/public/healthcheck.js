function fetchStatus(url) {
  return fetch(url)
    .then(response => response.text());
  // return new Promise((resolve, reject) => resolve('Placeholder OK'));
}
