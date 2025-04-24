import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import './App.css'

function App() {
  return (
    <div>
      {/* Other global features like header, footer, etc. can go here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;