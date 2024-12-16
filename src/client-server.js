const configProcessor = require('./public/scripts/config-processor');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3017;

const app = express();


configProcessor.replaceConfigs();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function () {
  console.log(`Client server listening on port ${port}!`);
});