const fetch = require('node-fetch')

module.exports = async () => {
  const response = await fetch("http://dev.kulikov.berlin/mock_api/havel.json");
  const data = await response.json();
  return data;
}
