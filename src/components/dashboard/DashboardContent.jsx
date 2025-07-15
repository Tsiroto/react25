import { useState } from "react";
import { Outlet } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import Terminal from './Terminal';

export default function DashboardContent() {
    const [logs, setLogs] = useState([]);

    const addLog = (message) => {
        const time = new Date().toLocaleTimeString();
        setLogs((prev) => [...prev, { time, message }]);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
            <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 1 }}>
                <Outlet context={{ addLog }} />
            </Box>

            <Box sx={{ flexShrink: 0, borderTop: '1px solid #ccc' }}>
                <Terminal logs={logs} />
            </Box>
        </Box>
    );
}