import { Outlet, Link } from 'react-router-dom';
import React from 'react';
import './Layouts.css';

const Layout = () => {
    return (
        <div>
            <header style={{ backgroundColor: '#213448', color: 'white', padding: '10px', position: 'absolute', top: 0, left: 0, right: 0, width: '100%'}}>
                <nav>
                    <ul style={{ display: 'flex', listStyle: 'none', alignItems: 'center' }}>
                        <li style={{ marginRight: '20px' }}>
                            <Link to="/">
                                <img 
                                    src="/blogLogo1.png" 
                                    alt="Logo" 
                                    style={{ height: '90px', width: '110px' }} 
                                />
                            </Link>
                        </li>
                        <li style={{ marginRight: '20px' }}>
                            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '22pt' }}>
                                Home
                            </Link>
                        </li>
                        <li style={{ marginRight: '20px' }}>
                            <Link to="/create" style={{ color: 'white', textDecoration: 'none', fontSize: '22pt' }}>
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