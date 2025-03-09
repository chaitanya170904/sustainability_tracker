import React, { useState } from 'react';
import { Container, Box, Paper, ThemeProvider, createTheme } from '@mui/material';
import ActionList from './components/ActionList';
import ActionForm from './components/ActionForm';
import UserPreferences from './components/UserPreferences';
import { NotificationProvider } from './context/NotificationContext';
import './App.css';

function App() {
    const [actionToEdit, setActionToEdit] = useState(null);
    const [refreshList, setRefreshList] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#d32f2f',
            },
        },
    });

    const handleSubmitSuccess = () => {
        setActionToEdit(null);
        setRefreshList(prev => !prev);
    };

    return (
        <ThemeProvider theme={theme}>
            <NotificationProvider>
                <Paper sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                    <Container maxWidth="lg" sx={{ padding: 4 }}>
                        <Box component="header" sx={{ textAlign: 'center', mb: 4 }}>
                            <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Sustainability Actions Tracker</h1>
                            <p style={{ fontSize: '1.2rem', color: 'gray' }}>Track and manage your environmental impact</p>
                        </Box>

                        <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
                            <ActionForm actionToEdit={actionToEdit} onSubmitSuccess={handleSubmitSuccess} />
                        </Box>

                        <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
                            <ActionList onEdit={setActionToEdit} onRefresh={refreshList} />
                        </Box>
                    </Container>
                </Paper>
            </NotificationProvider>
        </ThemeProvider>
    );
}

export default App;
