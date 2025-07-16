import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Box, Toolbar } from '@mui/material';

const Layout = () => {

    const [logs, setLogs] = useState([]);

    const addLog = (entry) => {
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, { time, ...entry }]);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header addLog={addLog} />
            <Box sx={{ display: "flex", flexGrow: 1, minHeight: 0 }}>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Toolbar />
                    <Outlet context={{ addLog }}/>
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
