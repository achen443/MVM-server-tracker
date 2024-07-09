import React from 'react';
import { mapNames } from '../../nameMappings';
import { LocationFinder } from './LocationFinder'

export const ServerItem = ({ server, players }) => {
  const mapInfo = mapNames(server.map);

  return (
    <div>
      <p><strong>Address:</strong> {server.addr}</p>
      <p><strong>Name:</strong> {server.name}</p>
      <p><strong>Players:</strong> {server.players}/{server.max_players}</p>
      <p><strong>Map:</strong> {mapInfo.name} ({mapInfo.group})</p>
      <p><strong>Location:</strong> {LocationFinder(server.name)}</p>
      {players && (
              <div>
                <h4>Players:</h4>
                <ul style={{padding: '0', listStyle: 'none'}}>
                  {players.map((player, playerIndex) => (
                    <li key={playerIndex}>
                      <p><strong>Name:</strong> {player.name}</p>
                      <p><strong>Score:</strong> {player.score}</p>
                      <p><strong>Time:</strong> {player.time_played}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
    </div>
  );
};
