import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { response } from 'express';

function App() {
  const [servers, setServers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/servers')
      .then(response => {
        setServers(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    servers.forEach(server => {
      axios.get(`http://localhost:3001/api/servers/:ip/players`)
        .then(response => {
          setPlayers(prevPlayers => ({
            ...prevPlayers,
            [server.addr]: response.data,
          }));
        })
        .catch(error => {
          console.error("Error getting server players:", error);
        });
    });
  }, [servers]);

  return (
    <div className="App">
      <h1>Steam Servers</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {servers.map((server, index) => (
          <li key={index}>
            <p><strong>Address:</strong> {server.addr}</p>
            <p><strong>Gameport:</strong> {server.gameport}</p>
            <p><strong>Name:</strong> {server.name}</p>
            <p><strong>Region:</strong> {server.region}</p>
            <p><strong>Players:</strong> {server.players}/{server.max_players}</p>
            <p><strong>Map:</strong> {server.map}</p>
            <p><strong>Gametype:</strong> {server.gametype}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
