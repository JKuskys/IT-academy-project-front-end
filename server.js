const express = require('express');
const path = require('path');
const app = express();


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
