import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead,
    TablePagination, TableRow, TableSortLabel, Toolbar, Typography,
    Paper, Checkbox, useTheme, useMediaQuery,
    TextField, Select, MenuItem, InputLabel, FormControl, Button
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';
import { useState, useMemo } from 'react';
import { useData } from '../../../data/DataContext.jsx';
import UserFormDialog from './UserFormDialog.jsx';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    { id: 'name', numeric: false, label: 'Name' },
    { id: 'department', numeric: false, label: 'Department' },
    { id: 'country', numeric: false, label: 'Country' },
    { id: 'remote', numeric: false, label: 'Remote' },
    { id: 'age', numeric: true, label: 'Age' },
    { id: 'annualIncome', numeric: true, label: 'Income (€)' },
];

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox"></TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={
                            headCell.id === 'annualIncome'
                                ? { display: { xs: 'none', md: 'table-cell' } }
                                : ['age', 'remote'].includes(headCell.id)
                                    ? { display: { xs: 'none', lg: 'table-cell' } }
                                    : {}
                        }
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function People() {
    const { data: people, loading, error } = useData();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [countryFilter, setCountryFilter] = useState('');

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCheckboxClick = (event, id) => {
        event.stopPropagation();
        setSelected((prev) => (prev.includes(id) ? [] : [id]));
    };

    const handleRowClick = (person) => {
        setEditingUser(person);
        setDialogOpen(true);
    };

    const handleAddUser = () => {
        setEditingUser(null);
        setDialogOpen(true);
    };

    const handleFormClose = () => {
        setDialogOpen(false);
        setEditingUser(null);
        setSelected([]);
    };

    const handleFormSave = (formData) => {
        handleFormClose();
    };

    const visiblePeople = useMemo(() => {
        let filtered = people || [];

        if (searchTerm) {
            filtered = filtered.filter((p) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (departmentFilter) {
            filtered = filtered.filter((p) => p.department === departmentFilter);
        }

        if (countryFilter) {
            filtered = filtered.filter((p) => p.country === countryFilter);
        }

        return filtered.sort(getComparator(order, orderBy));
    }, [people, searchTerm, departmentFilter, countryFilter, order, orderBy]);

    const pagedPeople = visiblePeople.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const uniqueDepartments = [...new Set((people || []).map(p => p.department))];
    const uniqueCountries = [...new Set((people || []).map(p => p.country))];

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ px: 3, width: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
            <Paper sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                        <TextField
                            label="Search by Name"
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <FormControl sx={{ minWidth: 160 }} size="small">
                                <InputLabel>Department</InputLabel>
                                <Select
                                    value={departmentFilter}
                                    label="Department"
                                    onChange={(e) => setDepartmentFilter(e.target.value)}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    {uniqueDepartments.map((d, i) => (
                                        <MenuItem key={i} value={d}>{d}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ minWidth: 160 }} size="small">
                                <InputLabel>Country</InputLabel>
                                <Select
                                    value={countryFilter}
                                    label="Country"
                                    onChange={(e) => setCountryFilter(e.target.value)}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    {uniqueCountries.map((c, i) => (
                                        <MenuItem key={i} value={c}>{c}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        {selected.length === 1 && (
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<EditIcon />}
                                onClick={() => {
                                    const person = people.find(p => p.id === selected[0]);
                                    if (person) handleRowClick(person);
                                }}
                            >
                                Edit
                            </Button>
                        )}
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<PersonAddIcon />}
                            onClick={handleAddUser}
                        >
                            Add User
                        </Button>
                    </Box>
                </Box>
            </Paper>

            <Paper sx={{ width: '100%', mb: 2, flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>

                <Box sx={{ flexGrow: 1, maxHeight: '40vh', overflow: 'auto' }}>
                    <TableContainer
                        sx={{
                            overflowX: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            maxWidth: '100%',
                        }}
                    >
                        <Table stickyHeader size={isSmallScreen ? 'small' : 'medium'} aria-label="enhanced table">
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {pagedPeople.map((person) => (
                                    <TableRow
                                        hover
                                        key={person.id}
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => handleRowClick(person)}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selected.includes(person.id)}
                                                onClick={(e) => handleCheckboxClick(e, person.id)}
                                            />
                                        </TableCell>

                                        <TableCell>{person.name}</TableCell>
                                        <TableCell>{person.department}</TableCell>
                                        <TableCell>{person.country}</TableCell>

                                        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                                            {person.remote ? 'Yes' : 'No'}
                                        </TableCell>
                                        <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                                            {person.age}
                                        </TableCell>
                                        <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                                            €{person.annualIncome.toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <TablePagination
                    rowsPerPageOptions={[5, 7, 10, 15, 25]}
                    component="div"
                    count={visiblePeople.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <UserFormDialog
                open={dialogOpen}
                onClose={handleFormClose}
                onSave={handleFormSave}
                initialData={editingUser}
            />
        </Box>
    );
}
