const { queryMasterServer, REGIONS } = require('steam-server-query');
const { queryGameServerPlayer } =  require('steam-server-query');
const { queryGameServerRules } = require('steam-server-query');
const axios = require('axios')
const API_KEY = '3F091F10D7E92463320FB0FEEBA8B9C2';


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
        filter: '\\appid\\440\\gametype\\mvm,valve,hidden'
      }
    });
    if (response.data && response.data.response && response.data.response.servers) {
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

getServerList().then(servers => {
  if (servers) {
    servers.forEach((server, index) => {
      console.log(`Server ${index + 1}:`);
      console.log(`  Address: ${server.addr}`);
      console.log(`  Gameport: ${server.gameport}`);
      console.log(`  SteamID: ${server.steamid}`);
      console.log(`  Name: ${server.name}`);
      console.log(`  AppID: ${server.appid}`);
      console.log(`  Game Directory: ${server.gamedir}`);
      console.log(`  Version: ${server.version}`);
      console.log(`  Product: ${server.product}`);
      console.log(`  Region: ${server.region}`);
      console.log(`  Players: ${server.players}/${server.max_players}`);
      console.log(`  Bots: ${server.bots}`);
      console.log(`  Map: ${server.map}`);
      console.log(`  Secure: ${server.secure}`);
      console.log(`  Dedicated: ${server.dedicated}`);
      console.log(`  OS: ${server.os}`);
      console.log(`  Gametype: ${server.gametype}`);
      console.log('------------------------------------');
    });
  } else {
    console.log('No servers found.');
  }
}).catch((err) => {
  console.error('Error:', err);
});