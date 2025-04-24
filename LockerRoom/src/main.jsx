import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../routes/Layouts.jsx';  
import Home from '../routes/Home.jsx'; 
import CreatePost from '../routes/CreatePost.jsx';     
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/create' index element={<CreatePost />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);