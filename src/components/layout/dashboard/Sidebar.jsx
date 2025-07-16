import { NavLink } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ProfileMenu from './ProfileMenu.jsx';
import {
    Avatar,
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';

const menuItems = [
    { text: 'Reports', icon: <BarChartIcon />, to: '/', color: '#1976d2' },
    { text: 'People', icon: <PeopleIcon />, to: '/people', color: '#1976d2' },
    { text: 'README', icon: <LibraryBooksIcon />, to: '/readme', color: '#1976d2' },  // this was missing
];

const bottomItems = [
    {
        text: 'Settings',
        color: '#1976d2',
        icon: <SettingsIcon />,
        log: '⚙️ No functional Settings!',
    },
    {
        text: 'About',
        color: '#1976d2',
        icon: <InfoIcon />,
        log: 'ℹ️ It\'s the first in a series of structured React projects aimed at improving real-world development skills.',
    },
    {
        text: 'Feedback',
        color: '#1976d2',
        icon: <FeedbackIcon />,
        log: '💬 Feedback is much appreciated!',
    },
];

export default function Sidebar({ addLog }) {
    return (
        <Drawer
            variant="permanent"
            sx={{
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                },
            }}
        >

            <Box>
                <Toolbar />
                <Box sx={{ overflow: 'auto', pt: 3, pr: 3 }}>
                    <List>
                        {menuItems.map((item) => (
                            <NavLink
                                to={item.to}
                                key={item.text}
                                style={{ textDecoration: 'none' }}
                                className={({ isActive }) => (isActive ? 'active-link' : '')}
                            >
                                <ListItem disablePadding>
                                    <ListItemButton
                                        className="sidebar-button"
                                        sx={{
                                            color: 'inherit',
                                            '&:hover': {
                                                backgroundColor: '#f0f0f0',
                                            },
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                color: item.color,
                                                minWidth: '40px',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                        ))}
                    </List>
                </Box>
            </Box>
            <Box>
                <Divider />
                <List>
                    {bottomItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                onClick={() => addLog?.(item.log)}
                            >
                                <ListItemIcon sx={{ color: item.color || 'inherit' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        p: 1,
                        '&:hover': {
                            cursor: 'pointer',
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        }
                    }}
                >
                    <Avatar sx={{ width: 32, height: 32, backgroundColor: '#1976d2' }}>G</Avatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="subtitle1">Giorgos Dev</Typography>
                        <Typography variant="caption" color="text.secondary">
                            giorgos@dev.com
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                        <ProfileMenu addLog={addLog} />
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
}
