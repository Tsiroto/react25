import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
import { Box, Toolbar } from '@mui/material';

const Layout = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <Box sx={{ display: "flex", flexGrow: 1, minHeight: 0 }}>
                <Box sx={{ width: 240, flexShrink: 0 }}>
                    <SideBar />
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        overflow: "hidden", // prevent vertical scroll here
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Toolbar />
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
