import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { api } from '../services/api';

function ActionList({ onEdit, onRefresh }) {
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadActions();
    }, [onRefresh]);

    const loadActions = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.getActions();
            setActions(response.data);
        } catch (error) {
            console.error('Error loading actions:', error);
            setError('Failed to load actions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this action?')) {
            return;
        }

        try {
            await api.deleteAction(id);
            setActions(prevActions => prevActions.filter(action => action.id !== id));
        } catch (error) {
            console.error('Error deleting action:', error);
            setError('Failed to delete action. Please try again.');
        }
    };

    const totalPoints = actions.reduce((total, action) => total + action.points, 0);

    return (
        <div>
            {error && <Alert severity="error">{error}</Alert>}
            <div style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: '1.2rem' }}>
                Total Points: {totalPoints}
            </div>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Action</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Points</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {actions.map((action) => (
                                <TableRow key={action.id}>
                                    <TableCell>{action.action}</TableCell>
                                    <TableCell>{new Date(action.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{action.points}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => onEdit(action)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(action.id)} sx={{ color: 'red' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </div>
    );
}

export default ActionList;
