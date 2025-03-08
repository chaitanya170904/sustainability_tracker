import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import ActionList from './components/ActionList';
import ActionForm from './components/ActionForm';
import './App.css';

function App() {
  const [actionToEdit, setActionToEdit] = useState(null);
  const [refreshList, setRefreshList] = useState(false);

  const handleSubmitSuccess = () => {
    setActionToEdit(null);
    setRefreshList(!refreshList);
  };

  return (
    <div className="App">
      <Container>
        <header className="App-header">
          <Typography variant="h4" component="h1">
            Sustainability Actions Tracker
          </Typography>
        </header>
        
        <div className="form-container">
          <ActionForm 
            actionToEdit={actionToEdit} 
            onSubmitSuccess={handleSubmitSuccess} 
          />
        </div>

        <div className="table-container">
          <ActionList 
            onEdit={setActionToEdit} 
            onRefresh={refreshList} 
          />
        </div>
      </Container>
    </div>
  );
}

export default App;
