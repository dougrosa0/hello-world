const express = require('express');

const app = express();
const port = 3017;

app.use(express.static('public'));

app.listen(port, function () {
  console.log(`Client server listening on port ${port}!`);
});