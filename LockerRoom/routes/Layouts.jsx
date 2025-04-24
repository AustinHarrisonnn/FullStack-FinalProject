import { Outlet, Link } from 'react-router-dom';
import React from 'react';
import './Layouts.css';

const Layout = () => {
    return (
        <div>
            <header style={{ backgroundColor: '#333', color: 'white', padding: '10px' }}>
                <nav>
                    <ul style={{ display: 'flex', listStyle: 'none' }}>
                        <li style={{ marginRight: '20px' }}>
                            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                                Home
                            </Link>
                        </li>
                        <li style={{ marginRight: '20px' }}>
                            <Link to="/create" style={{ color: 'white', textDecoration: 'none' }}>
                                Create Post
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;