require('dotenv').config();

const express = require('express')
const Eleventy = require('@11ty/eleventy');
const { ncp } = require('ncp');

const elev = new Eleventy();
const app = express();

const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
const SOURCE = process.env.COPY_SOURCE;
const DESTINATION = process.env.COPY_DESTINATION;

app.get('/generate', async (req, res) => {
  if (req.query.key === API_KEY) {
    await elev.init();
    await elev.write();

    ncp(SOURCE, DESTINATION, (error) => {
      if (error) {
        console.error(error);
        res.send('Error.');
      }
      console.log(`COPY ${SOURCE} to ${DESTINATION} done.`);
    });

    res.send('Done.');
  } else {
    res.send('No way dude!');
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
