import { useData } from '../../data/DataContext';
import {Box, Card, CardContent, Typography, Alert, Button} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import {useEffect} from "react";

const Report = ({ addLog }) => {
    const { data, loading, error, fetchData } = useData();

    const totalPeople = data?.length ?? 0;
    const avgAge =
        totalPeople > 0
            ? (data.reduce((sum, p) => sum + p.age, 0) / totalPeople).toFixed(1)
            : '-';

    const remoteCount = data?.filter(p => p.remote).length ?? 0;
    const remotePercent = totalPeople > 0 ? ((remoteCount / totalPeople) * 100).toFixed(1) : '-';

    const avgIncome =
        totalPeople > 0
            ? (data.reduce((sum, p) => sum + p.annualIncome, 0) / totalPeople).toFixed(0)
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

    if (entries.length > 5) {
        const top5 = entries.slice(0, 5);
        const otherTotal = entries.slice(5).reduce((sum, item) => sum + item.value, 0);
        entries = [...top5, { name: 'Other', value: otherTotal }];
    }

    const countryData = entries;

    useEffect(() => {
        if (!addLog) return;

        if (loading) addLog('Fetching people from API...');
        if (error) addLog(`❌ Error: ${error.message || 'unknown'}`);
        if (!loading && !error && data?.length) {
            addLog(`✅ Loaded ${data.length} people.`);
        }
    }, [loading, error, data]);

    const handleRetry = () => {
        if (addLog) addLog('🔁 Retrying fetch...');
        fetchData();
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>📊 Report</Typography>
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

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                {[
                    { title: 'Total People', value: totalPeople },
                    { title: 'Average Age', value: avgAge },
                    { title: 'Remote Workers', value: `${remotePercent}%` },
                    { title: 'Average Income', value: `€${avgIncome}` },
                ].map((card, i) => (
                    <Card
                        key={i}
                        sx={{
                            flex: '1 1 180px',
                            minWidth: 150,
                            boxShadow: 'none',
                            border: 'none',
                            // borderRadius: 2,
                            // borderBottom: 'none'
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6">{card.title}</Typography>
                            <Typography variant="h4">{card.value}</Typography>
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

export default Report;
