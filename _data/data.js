const fetch = require('node-fetch')
const apiUrl = process.env.STRAPI_API_URL;

module.exports = async () => {
  const response = await fetch(`${apiUrl}/homepage`);
  const data = await response.json();

  return data;
}
