const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

const heroes = require('./routes/heroes');

const bodyParser = require('body-parser');

// enable CORS for development
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  // define allowable methods - PATCH is not allowed by default
  res.header("Access-Control-Allow-Methods", 'GET, POST, DELETE, PATCH');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// hide dist and node modules
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// heroes routes
app.use('/api/heroes', heroes);

// to serve index.html file, needs to be below any API calls
app.use('*', function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, 'dist')})
})

// fallthough in case no other routes are matched
app.use((_req, res) => {
  res.sendStatus(404);
});

// error handler
app.use((err, _req, res, _next) => {
  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
})
