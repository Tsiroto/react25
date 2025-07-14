import { Box, Grid, Typography } from '@mui/material';
import PeopleTable from '../../components/dashboard/PeopleTable.jsx';
// import ProductTree from '../../components/dashboard/ProductTree';
import PeopleByLocation from '../../components/dashboard/PeopleByLocation';

export default function DashboardContent() {
    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Overview
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
                Here you will see the report
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <PeopleTable />
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
                    <ProductTree />
                    <Box sx={{ mt: 3 }}>
                        <PeopleByLocation />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
