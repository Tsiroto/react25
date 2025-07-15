import {useEffect} from "react";
import { useOutletContext } from 'react-router-dom';
import { useData } from '../../data/DataContext';
import {Box, Card, CardContent, Typography, Alert, Button} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import BarChartIcon from '@mui/icons-material/BarChart';

const Reports = () => {
    const { addLog } = useOutletContext();
    const { data, loading, error, fetchData } = useData();

    const logMsg = (msg) => {
        const message =
            typeof msg === 'string'
                ? msg
                : typeof msg === 'object'
                    ? JSON.stringify(msg)
                    : String(msg);

        addLog(`[${new Date().toLocaleTimeString()}] > ${message}`);
    };

    const totalPeople = data?.length ?? 0;

    const avgAge = totalPeople
        ? (data.reduce((sum, p) => sum + p.age, 0) / totalPeople).toFixed(1)
        : '-';

    const remoteCount = data?.filter(p => p.remote).length ?? 0;
    const remotePercent = totalPeople
        ? ((remoteCount / totalPeople) * 100).toFixed(1)
        : '-';

    const avgIncome = totalPeople
        ? (data.reduce((sum, p) => sum + p.annualIncome, 0) / totalPeople).toFixed(0)
        : '-';

    const departments = new Set(data.map(p => p.department));
    const departmentCounts = departments.size;

    const departmentFreq = {};
    data.forEach(p => {
        departmentFreq[p.department] = (departmentFreq[p.department] || 0) + 1;
    });
    const mostCommonDepartment = Object.entries(departmentFreq)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

    const topEarnerData = data.length
        ? data.reduce((top, p) => (p.annualIncome > top.annualIncome ? p : top), data[0])
        : null;
    const topEarner = topEarnerData
        ? `€${topEarnerData.annualIncome} annual`
        : '-';

    const yearsAtCurrentJob = data?.reduce((longest, p) =>
        (p.yearsAtCurrentJob > longest.yearsAtCurrentJob ? p : longest), data[0]) || {};
    const longestTenure = yearsAtCurrentJob?.yearsAtCurrentJob
        ? `${yearsAtCurrentJob.yearsAtCurrentJob} years`
        : '-';

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    const countryMap = {};
    data?.forEach(person => {
        const country = person.country || 'Unknown';
        countryMap[country] = (countryMap[country] || 0) + 1;
    });

    let entries = Object.entries(countryMap)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    if (entries.length > 4) {
        const top4 = entries.slice(0, 4);
        const otherTotal = entries.slice(4).reduce((sum, item) => sum + item.value, 0);
        entries = [...top4, { name: 'Other', value: otherTotal }];
    }

    const countryData = entries;

    console.log("avgAge is", avgAge);
    useEffect(() => {
        const fetchAndLog = async () => {
            if (typeof fetchData === 'function') {
                logMsg("Fetching data from API...");
                await fetchData();
            } else {
                logMsg("❌ fetchData is not a function");
            }
        };

        fetchAndLog();
    }, []);

    useEffect(() => {
        if (!data || data.length === 0 || !addLog) return;

        logMsg(`✅ Loaded ${totalPeople} people.`);
        logMsg(`Average age: ${avgAge}`);
        logMsg(`Remote workers: ${remoteCount} (${remotePercent}%)`);
        logMsg(`Average income: €${avgIncome}`);
        logMsg(`Departments: ${departmentCounts}`);
        logMsg(`Most common department: ${mostCommonDepartment}`);
        logMsg(`Top earner: ${topEarner}`);
        logMsg(`Longest tenure: ${longestTenure}`);
    }, [data]);

    const handleRetry = () => {
        if (addLog) logMsg('🔁 Retrying fetch...');
        fetchData();
    };

    return (
        <Box>
            <Box display="flex" alignItems="center" gap={1} pt="20px" pb="20px">
                <BarChartIcon sx={{ color: '#1976d2', fontSize: '2rem' }} />
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Reports
                </Typography>
            </Box>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography>
                            Failed to load data: {error.message || 'Unknown error'}
                        </Typography>
                        <Button
                            onClick={handleRetry}
                            size="normal"
                            variant="text"
                            sx={{
                                ml: 2,
                                whiteSpace: 'nowrap',
                                transition: 'color 0.2s',
                                '&:hover': {
                                    color: '#ffffff',
                                    backgroundColor: '#2d2f5a',
                                    cursor: 'pointer',
                                    boxShadow: 1,
                                }
                            }}
                        >
                            Retry
                        </Button>
                    </Box>
                </Alert>
            )}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                {[
                    { title: 'Total People', value: totalPeople },
                    { title: 'Average Age', value: avgAge },
                    { title: 'Remote Workers', value: `${remotePercent}%` },
                    { title: 'Average Income', value: `€${avgIncome}` },
                    { title: 'Departments', value: `${departmentCounts}` },
                    { title: 'Most Common Dpt', value: mostCommonDepartment },
                    { title: 'Top Earner', value: `${topEarner}` },
                    { title: 'Longest Tenure', value: `${longestTenure}` },
                ].map((card, i) => (
                    <Card
                        key={i}
                        sx={{
                            flex: '1 1 180px',
                            minWidth: 150,
                            boxShadow: 'none',
                            border: '1px solid lightgrey',
                            borderRadius: 2,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" textAlign='center'>{card.title}</Typography>
                            <Typography variant="h5" color='#649dd5' textAlign='center'>{card.value}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 4
                }}
            >
                <Typography variant="h6" gutterBottom>People by Location</Typography>

                <Box sx={{ width: 300, height: 300, position: 'relative' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={countryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={3}
                                dataKey="value"
                                label
                            >
                                {countryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            pointerEvents: 'none',
                        }}
                    >
                        <Typography variant="h6">{totalPeople}</Typography>
                        <Typography variant="caption" color="text.secondary">Total</Typography>
                    </Box>
                </Box>

                <Box sx={{ minWidth: 200 }}>
                    {countryData.map((entry, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box sx={{
                                width: 12,
                                height: 12,
                                backgroundColor: COLORS[index % COLORS.length],
                                borderRadius: '50%',
                                mr: 1
                            }} />
                            <Typography variant="body2">
                                {entry.name}: {entry.value} ({((entry.value / totalPeople) * 100).toFixed(1)}%)
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

        </Box>
    );
};

export default Reports;
