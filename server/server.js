const express = require('express');
const request = require('request');
const app = express();
const PORT = 3001;
const API_KEY = '3F091F10D7E92463320FB0FEEBA8B9C2'; 
const { queryMasterServer, REGIONS } = require('steam-server-query');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.get('/api/servers', (req, res) => {
  queryMasterServer('hl2master.steampowered.com:27011', REGIONS.ALL, { empty: 1, appid: 440 })
    .then(servers => {
      res.json(servers);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500).send('500 - Server Error');
});

app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});