import { useState } from 'react';
import { IconButton, Menu, MenuItem, Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ProfileMenu = ({ addLog }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        addLog?.('📂 Opened profile menu');
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotImplemented = (label) => {
        addLog?.(`⚠️ "${label}" clicked — Sorry, not working!`);
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleClick} sx={{ '&:hover': { color: '#1976d2' } }}>
                <MoreVertIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 3,
                    sx: { width: 200 },
                }}
            >
                <MenuItem onClick={() => handleNotImplemented('Profile')}>Profile</MenuItem>
                <MenuItem onClick={() => handleNotImplemented('My account')}>My account</MenuItem>
                <MenuItem onClick={() => handleNotImplemented('Add another account')}>Add another account</MenuItem>
                <Divider />
                <MenuItem onClick={() => handleNotImplemented('Logout')}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default ProfileMenu;
