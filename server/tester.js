const { queryMasterServer, REGIONS } = require('steam-server-query');
const { queryGameServerPlayer } =  require('steam-server-query');
const { queryGameServerRules } = require('steam-server-query');
const axios = require('axios');
const { query } = require('express');
const API_KEY = '3F091F10D7E92463320FB0FEEBA8B9C2';
const { GameDig } = require('gamedig');


/*queryMasterServer('hl2master.steampowered.com:27011', REGIONS.ALL, { empty: 1, appid: 440, gametype: ['hidden'] }).then(servers => {
  console.log(servers);
}).catch((err) => {
  console.error(err);
});*/

/*queryGameServerPlayer('71.185.186.60:27119', 1, 2000).then(playerResponse => {
  console.log(playerResponse);
}).catch((err) => {
  console.error(err);
}); */

//https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=3F091F10D7E92463320FB0FEEBA8B9C2&limit=50000&filter=\appid\730\map\de_mirage

async function getServerList() {
  try {
    const response = await axios.get('https://api.steampowered.com/IGameServersService/GetServerList/v1/', {
      params: {
        key: API_KEY,
        filter: '\\appid\\440\\gametype\\mvm,valve,hidden\\empty\\1',
        limit: 500
      }
    });
    if (response.data) {
      return response.data.response.servers;
    } else {
      console.error('Unexpected response format:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Failed to retrieve server list:', error);
    return null;
  }
}
function ipToFakeIP(server) {
  const [ip, port] = server.addr.split(':');
  let [part1, part2, part3, part4] = ip.split('.').map(Number);

  const conversion = num => num.toString(2).padStart(8, '0');
  part1 = conversion(part1);
  part2 = conversion(part2);
  part3 = conversion(part3);
  part4 = conversion(part4);

  let fullBinary = part1 + part2 + part3 + part4;

  let fakeIP = parseInt(fullBinary, 2);

  return fakeIP;
}

function getPort(server) {
  const [ip, port] = server.addr.split(':');
  return port;
}

async function queryByFakeIP(server) {
  try {
    const response = await axios.get('https://api.steampowered.com/IGameServersService/QueryByFakeIP/v1/', {
      params: {
        key: API_KEY,
        fake_ip: ipToFakeIP(server),
        fake_port: getPort(server),
        app_id: 440,
        query_type: 2
      }
    });
    if (response.data) {
      return response.data.response.players_data.players
    } else {
      console.error('No response')
    }
  } catch (error) {
    console.error('Failed', error);
    return null;
  }
}

getServerList().then(servers => {
  if (servers) {
    servers.forEach((server, index) => {
      console.log(`Server ${index + 1}:`);
      console.log(`  Address: ${server.addr}`);
      console.log(`  Gameport: ${server.gameport}`);
      console.log(`  Name: ${server.name}`);
      console.log(`  Region: ${server.region}`);
      console.log(`  Players: ${server.players}/${server.max_players}`);
      console.log(`  Map: ${server.map}`);
      console.log(`  Gametype: ${server.gametype}`);
      console.log('------------------------------------');
      queryByFakeIP(server).then(players_response => {
        players_response.forEach((player, idx) => {
          console.log(`  Player ${idx + 1}:`);
          console.log(`    Name: ${player.name}`);
          console.log(`    Score: ${player.score}`);
          console.log(`    Time Played: ${player.time_played}`);
        });
      }).catch(err => {
        console.error('Players in server error');
      })
      console.log('------------------------------------');
    });
  } else {
    console.log('No servers found.');
  }
}).catch((err) => {
  console.error('Error:', err);
}); 

