import React from 'react';
import { mapNames } from '../../nameMappings';
import { LocationFinder } from './LocationFinder';

export const ServerItem = ({ server, players }) => {
  const mapInfo = mapNames(server.map);

  function calculateTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <div style={{margin:'10px'}}>
      <div style={{ justifyContent: 'space-between', display: 'flex' }}>
        <p><strong>{mapInfo.name} ({mapInfo.group})</strong></p>
        <p><strong>Players: {server.players}/{server.max_players}</strong></p>
      </div>
      <div style={{justifyContent: 'space-between', display: 'flex', backgroundColor: '#3e3e3e', whiteSpace: 'nowrap', alignContent: 'center'}}>
        <p style={{color: 'black', margin: '10px'}}> {LocationFinder(server.name)}</p>
        <p style={{color: 'white', margin: '10px'}}><div>{server.addr}</div></p>
      </div>
      {players && (
        <div style={{ justifyContent: 'start', display: 'flex'}}>
          <ul style={{ padding: '0', listStyle: 'none', width: '100%' }}>
            {players.map((player, playerIndex) => (
              <li key={playerIndex}>
                <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#4f4d4d', border: '10px'}}>
                  <p style={{ flex: 1, textAlign: 'left', color: 'black', fontSize: '13px', margin: '10px' }}><strong>Name:</strong> {player.name}</p>
                  <p style={{ flex: 1, textAlign: 'right', color: 'black', fontSize: '13px' }}><strong>Kills:</strong> {player.score}</p>
                  <p style={{ flex: 1, textAlign: 'right', color: 'black', fontSize: '13px', margin: '10px' }}><strong>Time:</strong> {calculateTime(player.time_played)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

