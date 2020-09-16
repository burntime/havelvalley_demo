const fetch = require('node-fetch')
const apiUrl = process.env.STRAPI_API_URL;

module.exports = async () => {
  const response = await fetch(`${apiUrl}/locations`);
  const data = await response.json();

  console.log(data);
  return data;
}
