import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css'

const CreatePost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image_url, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('Posts').insert([
            {
                title,
                content,
                image_url: image_url,
            },
        ]);

        if (error) {
            console.error('Error creating post:', error);
        } else {
            setTitle('');
            setContent('');
            setImageUrl('');
            navigate('/');
        }
    };

    return (
        <div className='create-post'>
            <h2>Create a New Post:</h2>
            <form onSubmit={handleSubmit} className='post-form'>
                <input
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder='Content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Image URL (optional)'
                    value={image_url}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <button type='submit'>Post</button>
            </form>
        </div>
    );
};

export default CreatePost;