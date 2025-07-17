import { useState } from "react";
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Terminal from './Terminal.jsx';
import Sidebar from "./Sidebar.jsx";

export default function DashboardContent() {
    const [logs, setLogs] = useState([]);

    const addLog = (message) => {
        const time = new Date().toLocaleTimeString();
        setLogs((prev) => [...prev, { time, message }]);
    };

    return (
        <Box sx={{ display: "flex", height: "100%", overflow: "hidden" }}>
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, width: 240, flexShrink: 0 }}>
                <Sidebar addLog={addLog} />
            </Box>

            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 1 }}>
                    <Outlet context={{ addLog }} />
                </Box>

                <Box sx={{ flexShrink: 0, borderTop: '1px solid #ccc' }}>
                    <Terminal logs={logs} />
                </Box>
            </Box>
        </Box>
    );
}