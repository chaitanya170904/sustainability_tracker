import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import { api } from '../services/api';

function ActionForm({ actionToEdit, onSubmitSuccess }) {
    const [formData, setFormData] = useState({
        action: '',
        date: '',
        points: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (actionToEdit) {
            setFormData(actionToEdit);
        }
    }, [actionToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convert points to number
            const submitData = {
                ...formData,
                points: parseInt(formData.points, 10)
            };

            console.log('Submitting data:', submitData); // Debug log

            if (actionToEdit) {
                await api.updateAction(actionToEdit.id, submitData);
            } else {
                const response = await api.createAction(submitData);
                console.log('Response:', response); // Debug log
            }
            setFormData({ action: '', date: '', points: '' });
            onSubmitSuccess();
        } catch (error) {
            console.error('Error details:', error.response?.data || error.message);
            setError(error.response?.data?.detail || 'Failed to submit action');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: '0 auto' }}>
                <TextField
                    name="action"
                    label="Action"
                    value={formData.action}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    name="date"
                    label="Date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    name="points"
                    label="Points"
                    type="number"
                    value={formData.points}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    {actionToEdit ? 'Update' : 'Add'} Action
                </Button>
            </Box>
            <Snackbar 
                open={!!error} 
                autoHideDuration={6000} 
                onClose={() => setError(null)}
            >
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
}

export default ActionForm;
