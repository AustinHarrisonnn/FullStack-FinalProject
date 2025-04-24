import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import './Home.css'

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('Posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', error);
        } else {
            setPosts(data);
        }
    };

    return (
        <div className='home-page'>
            <h1>Welcome to the locker room</h1>
            <h2>Latest Posts:</h2>
            <div className='post-list'>
                {posts.map((post) => (
                    <Link to={`/post/${post.id}`} key={post.id} className='post-card-link'>
                        <div key={post.id} className='post-card'>
                            <h2>{post.title}</h2>
                            <p>{post.upvotes} Upvotes</p>
                            <p className='created-at'>
                                Posted on {new Date(post.created_at).toLocaleString()}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;