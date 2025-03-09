import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const showNotification = (message, severity = 'info') => {
        setNotification({
            open: true,
            message,
            severity
        });
    };

    const hideNotification = () => {
        setNotification(prev => ({
            ...prev,
            open: false
        }));
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={hideNotification}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert 
                    onClose={hideNotification} 
                    severity={notification.severity}
                    variant="filled"
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
}

export const useNotification = () => useContext(NotificationContext);
