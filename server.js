const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();
const API_HOST = process.env.API_HOST || 'localhost:8080';
const PORT = process.env.PORT || 3000;


// Serve static files....
app.use('/api', proxy({
  target: API_HOST,
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}));

// Send all requests to index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/IT-academy-project-front-end/index.html'));
});

// default Heroku PORT
app.listen(PORT);
