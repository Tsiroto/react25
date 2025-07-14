import { Box, Grid } from '@mui/material';
import Report from './Report.jsx';
import PeopleTable from './PeopleTable.jsx';
import { useState } from "react";
import Terminal from './Terminal';

export default function DashboardContent() {
    const [logs, setLogs] = useState([]);

    const addLog = (message) => {
        const time = new Date().toLocaleTimeString();
        setLogs((prev) => [...prev, { time, message }]);
    };

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} width={"100%"}>
                    <Report addLog={addLog} />
                    <PeopleTable />
                    <Terminal logs={logs} />
                </Grid>
            </Grid>
        </Box>
    );
}
