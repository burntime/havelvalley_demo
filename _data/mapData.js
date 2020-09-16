const fetch = require('node-fetch')
const apiUrl = process.env.STRAPI_API_URL;

module.exports = async () => {
  const response = await fetch(`http://dev.kulikov.berlin/mock_api/havel.json`);
  const data = await response.json();

  console.log(data);
  return data;
}
