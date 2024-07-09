const express = require('express');
const request = require('request');
const app = express();
const PORT = 3001;
const API_KEY = '3F091F10D7E92463320FB0FEEBA8B9C2'; 
const { queryMasterServer, REGIONS } = require('steam-server-query');
const { getServerList, queryByFakeIP, ipToFakeIP, getPort } = require('./tester');
const db = require('./db');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.get('/api/servers', async (req, res) => {
  try {
    const servers = await getServerList();
    if (servers) {
      res.json(servers);
    } else {
      res.status(500).json({ error: 'No servers returned' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unexpected Error' });
  }
});

app.get('/api/servers/:ip/players', async (req, res) => {
  const { ip } = req.params;
  try {
    const server = { addr: ip };
    const players = await queryByFakeIP(server);
    if (players) {
      res.json(players);
    } else {
      res.status(500).json({ error: 'No players found.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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