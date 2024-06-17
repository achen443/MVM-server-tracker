import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LocationFinder } from './components/LocationFinder';
import { mapNames } from '../nameMappings';
import { ServerItem } from './components/ServerItem'

function App() {
  const [servers, setServers] = useState([]);
  const [error, setError] = useState(null);
  const [players, setPlayers] = useState({});

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
      axios.get(`http://localhost:3001/api/servers/${server.addr}/players`)
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
      <h1 style={{textAlign: 'center'}}>Steam Servers</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {servers.map((server, index) => (
          <ServerItem key={index} server={server} players={players[server.addr]} />
        ))}
      </ul>
    </div>
  );
}

export default App;
