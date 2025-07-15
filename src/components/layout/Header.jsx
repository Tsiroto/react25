import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { format } from 'date-fns';
import {
    theColor,
    primaryColor,
    backgroundColor,
    layoutZIndex,
    headerHeight
} from '../../config/layoutSettings.js';

export default function Header() {

    const currentDate = format(new Date(), 'EEEE, d MMMM, yyyy');
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

                        <DashboardIcon fontSize="large" sx={{ color: theColor }} />
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
                        href="https://chiroto.eu/"
                        color={primaryColor}
                        underline="none"
                        rel="noopener"
                        sx={{ alignSelf: "center", mt: 2, mb: 2,
                            transition: 'color 0.2s',
                            '&:hover': {
                                color: '#2d2f5a',
                            }
                    }}
                    >
                        Back to my Website
                    </Typography>

                </Box>

                <Box display={"flex"}>
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
                        }}
                    >
                        <NotificationsIcon />
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                backgroundColor: 'red',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: 6,
                                right: 6,
                            }}
                        />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
