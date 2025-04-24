import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../routes/Layouts.jsx';  
import Home from '../routes/Home.jsx'; 
import CreatePost from '../routes/CreatePost.jsx';  
import PostPage from '../routes/PostPage.jsx';   
import EditPost from '../routes/EditPost.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/create' index element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} /> 
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);