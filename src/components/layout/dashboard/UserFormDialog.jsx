import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, MenuItem, Select, InputLabel,
    FormControl, Box, Chip, Typography, Snackbar, Alert
} from '@mui/material';
import { useEffect, useState } from 'react';

const employmentOptions = ['Employed', 'Freelance', 'Intern'];
const defaultCountries = ['Greece', 'Cyprus', 'Germany', 'France', 'Netherlands', 'USA'];

const defaultFormState = {
    name: '',
    department: '',
    country: '',
    age: 19,
    salary: 0,
    remote: false,
    employmentStatus: '',
    yearsAtCurrentJob: 0,
    skills: [],
    newSkill: '',
};

const UserFormDialog = ({ open, onClose, onSave, initialData = {} }) => {
    const [form, setForm] = useState({
        name: '',
        department: '',
        country: '',
        age: 19,
        salary: 0,
        remote: false,
        employmentStatus: '',
        yearsAtCurrentJob: 0,
        skills: [],
        newSkill: '',
    });

    const [errors, setErrors] = useState({});
    const [showSaved, setShowSaved] = useState(false);

    useEffect(() => {
        if (open) {
            setForm(initialData?.id
                ? {
                    ...defaultFormState,
                    ...initialData,
                    salary: initialData.annualIncome || 0,
                    skills: initialData.skills || [],
                    newSkill: '',
                }
                : defaultFormState
            );
            setErrors({});
        }
    }, [open, initialData]);

    const validate = () => {
        const newErrors = {};

        if (form.age < 19) newErrors.age = 'Must be 19 or above';
        else if (form.age > 99) newErrors.age = '99?? Just enjoy your pension and relax!';

        if (form.salary > 150000) {
            newErrors.salary = 'Impressive salary amount, you don’t need to work anymore, enjoy your paper!';
        }

        if (!defaultCountries.includes(form.country)) {
            newErrors.country = 'Please select a valid country';
        }

        if (form.yearsAtCurrentJob > form.age - 18) {
            newErrors.yearsAtCurrentJob = `Cannot exceed ${form.age - 18} years`;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSkillAdd = () => {
        const skill = form.newSkill.trim();
        if (skill && !form.skills.includes(skill)) {
            setForm((prev) => ({
                ...prev,
                skills: [...prev.skills, skill],
                newSkill: ''
            }));
        }
    };

    const handleSkillDelete = (skillToDelete) => {
        setForm((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s !== skillToDelete)
        }));
    };

    const handleSubmit = () => {
        if (!validate()) return;

        const { salary, ...rest } = form;
        const payload = { ...rest, annualIncome: salary };
        onSave(payload);
        setShowSaved(true);
        setTimeout(() => {
            setShowSaved(false);
        }, 3000);
    };

    return (
        <>
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{initialData?.id ? 'Edit User' : 'Add User'}</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <TextField
                    label="Name"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Department"
                    value={form.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                    fullWidth
                />

                <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                        value={form.country}
                        onChange={(e) => handleChange('country', e.target.value)}
                        label="Country"
                        error={!!errors.country}
                    >
                        {defaultCountries.map((c) => (
                            <MenuItem key={c} value={c}>{c}</MenuItem>
                        ))}
                    </Select>
                    {errors.country && <Typography color="error" variant="caption">{errors.country}</Typography>}
                </FormControl>

                <TextField
                    label="Age"
                    type="number"
                    value={form.age}
                    onChange={(e) => handleChange('age', parseInt(e.target.value))}
                    error={!!errors.age}
                    helperText={errors.age}
                />

                <TextField
                    label="Salary (annual)"
                    type="number"
                    value={form.salary}
                    onChange={(e) => handleChange('salary', parseInt(e.target.value))}
                    error={!!errors.salary}
                    helperText={errors.salary || 'Optional, default is 0'}
                />

                <FormControl fullWidth>
                    <InputLabel>Employment Status</InputLabel>
                    <Select
                        value={form.employmentStatus}
                        onChange={(e) => handleChange('employmentStatus', e.target.value)}
                        label="Employment Status"
                    >
                        {employmentOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Years at Current Job"
                    type="number"
                    value={form.yearsAtCurrentJob}
                    onChange={(e) => handleChange('yearsAtCurrentJob', parseInt(e.target.value))}
                    error={!!errors.yearsAtCurrentJob}
                    helperText={errors.yearsAtCurrentJob}
                />

                <Box>
                    <Typography variant="subtitle1">Skills</Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
                        <TextField
                            label="Add skill"
                            value={form.newSkill}
                            onChange={(e) => handleChange('newSkill', e.target.value)}
                            size="small"
                        />
                        <Button onClick={handleSkillAdd} variant="outlined">Add</Button>
                    </Box>
                    <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {form.skills.map((skill, idx) => (
                            <Chip
                                key={idx}
                                label={skill}
                                onDelete={() => handleSkillDelete(skill)}
                                color="primary"
                            />
                        ))}
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>

        </Dialog>
        <Snackbar open={showSaved} autoHideDuration={3000} onClose={() => setShowSaved(false)}>
            <Alert onClose={() => setShowSaved(false)} severity="success" sx={{ width: '100%' }}>
                Saved! (Not for real)
            </Alert>
        </Snackbar>
        </>

    );
};

export default UserFormDialog;
