import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Login';
// Import the component from its new file location
import NotesPage from './pages/Notes'; // <-- UPDATED IMPORT
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    {/* The path is now '/notes' and it renders the NotesPage component */}
                    <Route path="/notes" element={<NotesPage />} /> {/* <-- UPDATED ROUTE */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;