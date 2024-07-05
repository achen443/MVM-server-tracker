import React, { useEffect, useState } from 'react';
import { ServerItem } from './ServerItem';

const ServerButton = ({ server, players, collapseAll }) => {
    const [open, setOpen] = useState(true);
    const toggleOpen = () => {
        setOpen(!open);
    }

    useEffect(() => {
        setOpen(collapseAll);
    }, [collapseAll]);

    return (
        <div className='ServerButton' onClick={toggleOpen} style={{ textAlign: 'center', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
                {server.name}
            {open && (
                <div className='ServerDropdown' style={{ backgroundColor: '#d0d0d0', marginTop: '10px', padding: '10px', borderRadius: '5px' }}
                onClick={(e) => e.stopPropagation()} // Prevent click events from propagating
                >
                    <ServerItem server={server} players={players} />
                </div>
            )}
        </div>
    );
};

export default ServerButton;
