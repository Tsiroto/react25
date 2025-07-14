import { useEffect, useState } from 'react';
import {
    AppBar,
    Box,
    Typography,
    Button,
    CssBaseline,
    Drawer,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Toolbar,
    Tooltip,
    Paper,
    CircularProgress,
    Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { InputAdornment } from '@mui/material';

export default function UserDeck() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPeople = people.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetch('http://localhost:3000/people')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then((data) => {
                setPeople(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error:', err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
        setSearchTerm(searchInput);
        }, 200);
        return () => clearTimeout(timeout);
    }, [searchInput]);


    const clearLocalStorage = () => {
        localStorage.clear();
        fetch('http://localhost:3000/people')
            .then(res => res.json())
            .then(data => setPeople(data))
            .catch(err => console.error("Reload error:", err));
        alert("localStorage has been cleared. This doesn't affect API data.");
    };

    const drawerWidth = 240;



    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box sx={{ display: 'flex', height: '100%' }}>
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <Typography variant="h4" gutterBottom>
                        UserDeck
                    </Typography>


                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <Box sx={{ my: 2 }}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Search by name"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Name</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredPeople.map((p) => (
                                            <TableRow key={p.id}>
                                                <TableCell>{p.id}</TableCell>
                                                <TableCell>{p.name}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                        )}
                </Box>
            </Box>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
                    <Stack direction="row" sx={{ mb: 2 }}>
                    </Stack>
                    <Stack direction="row"  gap={1} sx={{ mb: 2 }}>
                        <Tooltip title="Add User">
                            <Button variant="outlined" onClick={clearLocalStorage} color="primary" startIcon={<PersonAddIcon />}>
                                Add User
                            </Button>
                        </Tooltip>
                        <Tooltip title="This only clears your browser's localStorage. API data remains unaffected.">
                            <Button variant="outlined" onClick={clearLocalStorage} color="warning" startIcon={<ClearAllIcon />}>
                                Reset Users
                            </Button>
                        </Tooltip>
                    </Stack>
                </Box>
                <Toolbar />
                <Typography sx={{ marginBottom: 2 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </Box>

        </Box>
    );
}
