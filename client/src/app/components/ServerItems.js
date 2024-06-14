import React from 'react';
import { getFriendlyMapInfo } from './mapNameMappings';
import PlayerList from './PlayerList';
import { mapnames } from '../nameMappings';
import { locationFinder } from '/LocationFinder.js'

const ServerItem = ({ server, players }) => {

  return (
    <li>
      <p><strong>Address:</strong> {server.addr}</p>
      <p><strong>Gameport:</strong> {server.gameport}</p>
      <p><strong>Name:</strong> {server.name}</p>
      <p><strong>Region:</strong> {server.region}</p>
      <p><strong>Players:</strong> {server.players}/{server.max_players}</p>
      <p><strong>Map:</strong> {mapNameMappings(server.map)}</p>
      <p><strong>Gametype:</strong> {server.gametype}</p>
      {players && <PlayerList players={players} />}
    </li>
  );
};

export default ServerItem;