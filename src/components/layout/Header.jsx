import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
    theColor,
    primaryColor,
    backgroundColor,
    layoutZIndex,
    headerHeight
} from '../../config/layoutSettings.js';

export default function Header({ addLog }) {
    const currentDate = format(new Date(), 'EEEE, d MMMM, yyyy');
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path) => {
        handleClose();
        if (path.startsWith('http')) {
            window.open(path, '_blank');
        } else {
            navigate(path);
        }
    };

    return (
        <AppBar
            position="fixed"
            elevation={1}
            sx={{
                backgroundColor: backgroundColor,
                color: theColor,
                zIndex: layoutZIndex.appBar,
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: 'space-between',
                    minHeight: `${headerHeight}px`
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 3,
                            border: '1px solid #e0e0e0',
                            borderRadius: 1,
                            px: 2,
                            m: 2,
                            transition: 'color 0.2s',
                            '&:hover': {
                                color: '#2d2f5a',
                                cursor: 'pointer',
                                boxShadow: 1,
                            }
                        }}
                    >
                        <DashboardIcon fontSize="large" sx={{ display: { xs: 'none', lg: 'flex' }, color: theColor }} />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography
                                variant="h2"
                                fontWeight="bold"
                                fontSize={'1.1rem'}
                                noWrap
                            >
                                Project
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                People
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <KeyboardArrowUpIcon fontSize="small" />
                            <KeyboardArrowDownIcon fontSize="small" />
                        </Box>
                    </Box>
                    <Typography
                        component="a"
                        href="https://giorgosn8.sg-host.com/"
                        target="_blank"
                        rel="noopener"
                        color={theColor}
                        fontSize={"1.1rem"}
                        fontWeight={450}
                        sx={{
                            display: { xs: 'none', lg: 'flex' },
                            alignSelf: "center",
                            mt: 2,
                            mb: 2,
                            transition: 'color 0.2s',
                            '&:hover': {
                                color: '#2d2f5a',
                                backgroundColor: 'transparent',
                            }
                        }}
                    >
                        Visit Portfolio
                    </Typography>
                </Box>

                <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            px: 2,
                            py: 0.5,
                            mr: 2,
                        }}
                    >
                        <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {currentDate}
                        </Typography>
                    </Box>
                    <IconButton
                        color="inherit"
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: 2,
                            border: '1px solid #e0e0e0',
                            ml: 1,
                            mr: 3,
                            position: 'relative',
                            '&:hover': { color: '#1976d2' }
                        }}
                    >
                        <NotificationsIcon />
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                backgroundColor: 'orangered',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: 6,
                                right: 6,
                            }}
                        />
                    </IconButton>
                </Box>

                <IconButton
                    sx={{
                        display: { xs: 'flex', lg: 'none' },
                        ml: 2,
                        backgroundColor: '#fff',
                        border: '1px solid #e0e0e0',
                        '&:hover': {
                            color: '#1976d2',
                        }
                    }}
                    onClick={handleMenuClick}
                >
                    <MenuIcon />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        elevation: 4,
                        sx: { mt: 1, minWidth: 160 }
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={() => handleNavigation('/')}>Reports</MenuItem>
                    <MenuItem onClick={() => handleNavigation('/people')}>People</MenuItem>
                    <MenuItem onClick={() => handleNavigation('/readme')}>ReadMe</MenuItem>
                    <Divider />
                    <MenuItem onClick={() => handleNavigation('https://giorgosn8.sg-host.com/')}>Visit Portfolio</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
