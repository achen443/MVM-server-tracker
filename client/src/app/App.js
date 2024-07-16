import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServerButton from './components/ServerButton'
import './App.css'
import { mapNames } from '../nameMappings'

function App() {
  const [servers, setServers] = useState([]);
  const [error, setError] = useState(null);
  const [players, setPlayers] = useState({});
  const [collapseAll, setCollapseAll] = useState(false);

  const toggle = () => {
    setCollapseAll(!collapseAll);
  }

  const validGroups = ['Mecha Engine', 'Two Cities', 'Gear Grinder', 'Steel Trap'];

  const filteredServers = servers.filter(server => {
    const mapInfo = mapNames(server.map);
    return validGroups.includes(mapInfo.group);
  });

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
    filteredServers.forEach(server => {
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
      }
    );
  }, [servers]);

  return (
    <div className="App">
      <div style={{backgroundColor: '#33334d', padding: '20px'}}>
        <h1 style={{textAlign: 'center'}}>Official MvM servers</h1>
        <div className='container' style={{display: 'flex', justifyContent: 'space-between', margin: 'auto'}}>
          <p>Server Count: {filteredServers.length}</p>
          <button onClick={toggle}>
            {collapseAll ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>
      <div className="container">
        {error && <p>Error: {error}</p>}
        <ul style={{padding: 0}}>
         {filteredServers.map((server, index) => (
           <ServerButton key={index} server={server} players={players[server.addr]} collapseAll={collapseAll} />
         ))}
      </ul>
      </div>
    </div>
  );
}

export default App;
