const fetch = require('node-fetch')
const apiUrl = process.env.STRAPI_API_URL;

module.exports = async () => {
  const response = await fetch(`${apiUrl}/pages`);
  const data = await response.json();

  return data;
}
