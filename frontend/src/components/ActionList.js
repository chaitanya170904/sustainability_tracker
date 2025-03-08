import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { api } from '../services/api';

function ActionList({ onEdit, onRefresh }) {
    const [actions, setActions] = useState([]);

    useEffect(() => {
        loadActions();
    }, [onRefresh]);

    const loadActions = async () => {
        try {
            const response = await api.getActions();
            setActions(response.data);
        } catch (error) {
            console.error('Error loading actions:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.deleteAction(id);
            loadActions();
        } catch (error) {
            console.error('Error deleting action:', error);
        }
    };

    return (
        <TableContainer component={Paper}>
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
                            <TableCell>{action.date}</TableCell>
                            <TableCell>{action.points}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(action)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(action.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ActionList;
