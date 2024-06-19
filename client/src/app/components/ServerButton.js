import React, { useState } from 'react';
import { ServerItem } from './ServerItem'

const ServerButton = ({ server, players }) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen(!open);
    }

    return (
        <div className='ServerButton'>
            <button onClick={toggleOpen}>
                {server.name}
            </button>
            {open && (
                <div className='ServerDropdown'>
                    <ServerItem server={server} players={players} />
                </div>
            )} 
        </div>
    );
};

export default ServerButton