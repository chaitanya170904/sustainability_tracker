import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function UserPreferences({ open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>User Preferences</DialogTitle>
            <DialogContent>
                {/* Add your preference fields here */}
                <p>Preferences will be implemented here.</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserPreferences;
