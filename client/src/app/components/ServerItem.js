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
      <div style={{ justifyContent: 'center', display: 'flex' }}>
        <p><strong>{server.name}</strong></p>
        <p><strong>{mapInfo.name}/({mapInfo.group})</strong></p>
        <p><strong>Players: {server.players}/{server.max_players}</strong></p>
      </div>
      <div style={{justifyContent: 'space-between', display: 'flex'}}>
        <p>{server.addr}</p>
        <p><strong>Location:</strong> {LocationFinder(server.name)}</p>
      </div>
      {players && (
        <div style={{ justifyContent: 'start', display: 'flex', padding: '20px' }}>
          <ul style={{ padding: '0', listStyle: 'none', width: '100%' }}>
            {players.map((player, playerIndex) => (
              <li key={playerIndex} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <p style={{ flex: 1, textAlign: 'left' }}><strong>Name:</strong> {player.name}</p>
                  <p style={{ flex: 1, textAlign: 'right' }}><strong>Kills:</strong> {player.score}</p>
                  <p style={{ flex: 1, textAlign: 'right' }}><strong>Time:</strong> {calculateTime(player.time_played)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

