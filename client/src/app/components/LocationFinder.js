export function LocationFinder(serverName) {
    if (!serverName) {
      return '';
    }
  
    const [valve, matchmaking, serverPart, location, crap, number] = serverName.split(' ');
    
    if (!location || !number) {
      return serverName; 
    }
  
    let slicedLocation = location.slice(1);
    let slicedNumber = number.slice(0, -1);
    return slicedLocation + ' ' + slicedNumber;
  }
  