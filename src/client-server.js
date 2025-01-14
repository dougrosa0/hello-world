require('dotenv').config();
const configProcessor = require('./public/scripts/config-processor');
const authRouter = require('./public/scripts/auth');
const express = require('express');
const { auth } = require('express-openid-connect');
const path = require('path');
const port = process.env.PORT || 3017;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

const app = express();

app.use(auth(config));

configProcessor.replaceConfigs();

app.use('/', authRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});