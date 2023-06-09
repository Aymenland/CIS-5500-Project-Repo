const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
app.get('/books', routes.books);
app.get('/search/:keywords', routes.search);
app.get('/top_reviewers', routes.top_reviewers);
app.get('/top_publishers', routes.top_publishers);
app.get('/fun_facts', routes.fun_facts);


app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;