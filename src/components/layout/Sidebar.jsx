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
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import FeedbackIcon from '@mui/icons-material/Feedback';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

const menuItems = [
    { text: 'Report', icon: <HomeIcon /> },
    { text: 'People', icon: <AssignmentIcon /> },
    { text: 'readMe.md', icon: <BarChartIcon /> },
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
                        {menuItems.map((item, index) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </ListItem>
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
                        p: 2,
                        '&:hover': {
                            cursor: 'pointer',
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        }
                    }}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>G</Avatar>
                    <Box>
                        <Typography variant="body2">Giorgos Dev</Typography>
                        <Typography variant="caption" color="text.secondary">
                            giorgos@dev.com
                        </Typography>
                    </Box>
                    <IconButton size="normal" sx={{ ml: 'auto' }}>
                        <MoreVertIcon fontSize="normal" />
                    </IconButton>
                </Box>
            </Box>
        </Drawer>
    );
}
