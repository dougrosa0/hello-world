const express = require('express');
const configProcessor = require('./public/scripts/config-processor');

const app = express();
const port = process.env.PORT || 3017;

configProcessor.replaceConfigs();

app.use(express.static('public'));

app.listen(port, function () {
  console.log(`Client server listening on port ${port}!`);
});