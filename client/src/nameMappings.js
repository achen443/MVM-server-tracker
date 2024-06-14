const mapNameMappings = {
    'mvm_bigrock_advanced1': { name: 'Broken Parts', group: 'Mecha Engine' },
    'mvm_bigrock_advanced2': { name: 'Bone Shaker', group: 'Mecha Engine' },
    'mvm_decoy_advaned3': { name: 'Disintegration', group: 'Mecha Engine' },
    'mvm_rottenburg_advanced1': { name: 'Hamlet Hostility', group: 'Two Cities' },
    'mvm_rottenburg_advanced2': { name: 'Bavarian Botbash', group: 'Two Cities' },
    'mvm_mannhattan_advanced1': { name: 'Empire Escalation', group: 'Two Cities' },
    'mvm_mannhattan_advanced2': { name: 'Metro Malice', group: 'Two Cities' },
    'mvm_coaltown_expert1': { name: 'Cataclysm', group: 'Gear Grinder' },
    'mvm_decoy_expert1': { name: 'Desperation', group: 'Gear Grinder' },
    'mvm_mannworks_expert1': { name: 'Mannslaughter', group: 'Gear Grinder' },
    'mvm_coaltown_advanced': { name: 'Ctrl+Alt+Destruction', group: 'Steel Trap' },
    'mvm_coaltown_advanced2': { name: 'CPU Slaughter', group: 'Steel Trap' },
    'mvm_decoy_advanced': { name: 'Disk Deletion', group: 'Steel Trap' },
    'mvm_decoy_advanced2': { name: 'Data Demolition', group: 'Steel Trap' },
    'mvm_mannworks_advanced': { name: 'Machine Massacre', group: 'Steel Trap' },
    'mvm_mannworks_ironman': { name: 'Mech Mutilation', group: 'Steel Trap' },
  };
  
  export const mapNames = (mapName) => {
    return mapNameMappings[mapName] || { name: mapName, group: 'Unknown' };
  };