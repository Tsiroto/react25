import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import FeedbackIcon from '@mui/icons-material/Feedback';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import {
    Avatar,
    Box, Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar, Typography
} from '@mui/material';

const menuItems = [
    { text: 'Reports', icon: <BarChartIcon />, to: '/', color: '#1976d2' },
    { text: 'People', icon: <PeopleIcon />, to: '/people', color: '#1976d2' },
    { text: 'ReadMe.md', icon: <LibraryBooksIcon />, to: '/readme', color: '#1976d2' },  // this was missing
];

const bottomItems = [
    { text: 'Settings', icon: <SettingsIcon /> },
    { text: 'About', icon: <InfoIcon /> },
    { text: 'Feedback', icon: <FeedbackIcon /> }
];

export default function Sidebar() {
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
                            <ListItemButton>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                {/* User Info */}
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
                    <IconButton size="normal" sx={{ ml: 'auto', '&:hover': { color: '#1976d2' } }}>
                        <MoreVertIcon fontSize="normal" />
                    </IconButton>
                </Box>
            </Box>
        </Drawer>
    );
}
