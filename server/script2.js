const { queryMasterServer, REGIONS } = require('steam-server-query');

queryMasterServer('hl2master.steampowered.com:27011', REGIONS.ALL, { empty: 1, appid: 440 }).then(servers => {
  console.log(servers);
}).catch((err) => {
  console.error(err);
});
