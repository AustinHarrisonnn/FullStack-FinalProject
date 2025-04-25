import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import './Home.css'

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState('new');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            let query = supabase.from('Posts').select('*');
    
            if (filter === 'new') {
                query = query.order('created_at', { ascending: false }); 
            } else if (filter === 'upvotes') {
                query = query.order('upvotes', { ascending: false });
            }
    
            const { data, error } = await query;
    
            if (error) {
                console.error('Error fetching posts:', error);
            } else {
                setPosts(data);  
            }
        };

        fetchPosts();  
    }, [filter]);  

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='home-page'>
            <h1>Welcome to the locker room</h1>
            <div className='about'>
                <h3>This is a fitness blog where you can upload and discuss anything fitness related. Feel free to explore other users posts and start a discussion in the comments! You can leave upvotes on any posts you like aswell to make them get more exposure.</h3>
            </div>
            <h2 className='filter-text'>
                {filter === 'new' ? 'Newest Posts:' : 'Most Upvoted Posts:'}
            </h2>

            <div className="filter-bar" style={{ marginBottom: '20px' }}>
                <label style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '19pt'}}>Sort by:</label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="new">Newest</option>
                    <option value="upvotes">Most Upvoted</option>
                </select>
            </div>

            <div className="search-bar" style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search posts by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                />
            </div>

            <div className='post-list'>
                {posts.length === 0 ? (
                    <p>No posts available.</p> 
                ) : (
                    filteredPosts.map((post) => (
                        <Link to={`/post/${post.id}`} key={post.id} className='post-card-link'>
                            <div className='post-card'>
                                <h2>{post.title}</h2>
                                <p>{post.upvotes} Upvotes</p>
                                <p className='created-at'>
                                    Posted on {new Date(post.created_at).toLocaleString()}
                                </p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;