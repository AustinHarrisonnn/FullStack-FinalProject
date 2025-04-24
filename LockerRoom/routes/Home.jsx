import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import './Home.css'

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState('new');

    useEffect(() => {
        const fetchPosts = async () => {
            // Initialize the query
            let query = supabase.from('Posts').select('*');
    
            // Change the query based on filter
            if (filter === 'new') {
                query = query.order('created_at', { ascending: false }); // Sorting by creation time (newest first)
            } else if (filter === 'upvotes') {
                query = query.order('upvotes', { ascending: false }); // Sorting by upvotes (highest first)
            }
    
            // Fetch data and update the state
            const { data, error } = await query;
    
            if (error) {
                console.error('Error fetching posts:', error);
            } else {
                setPosts(data);  // Update the posts state with fetched data
            }
        };

        fetchPosts();  // Call function on mount or when `filter` changes
    }, [filter]);  // This effect depends on `filter` state

    return (
        <div className='home-page'>
            <h1>Welcome to the locker room</h1>
            <h2>
                {filter === 'new' ? 'Newest Posts:' : 'Most Upvoted Posts:'}
            </h2>

            <div className="filter-bar" style={{ marginBottom: '20px' }}>
                <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Sort by:</label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="new">Newest</option>
                    <option value="upvotes">Most Upvoted</option>
                </select>
            </div>

            <div className='post-list'>
                {posts.length === 0 ? (
                    <p>No posts available.</p>  // Handle the empty posts state
                ) : (
                    posts.map((post) => (
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