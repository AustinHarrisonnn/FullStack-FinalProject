import React, { useEffect, useState } from 'react';
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
                    <div key={post.id} className='post-card'>
                        <h2>{post.title}</h2>
                        {post.image_url && <img src={post.image_url} alt='post' />}
                        <p className='created-at'>
                            Posted on {new Date(post.created_at).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;