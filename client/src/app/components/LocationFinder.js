import React from 'react';
import flagMappings from './FlagMappings';

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
  let flagSrc = flagMappings[slicedLocation];

  return (
      <div>{slicedLocation} {slicedNumber} <img src={flagSrc} alt={`${slicedLocation} flag`} style={{ height: '1em'}}/></div>
  );
}
