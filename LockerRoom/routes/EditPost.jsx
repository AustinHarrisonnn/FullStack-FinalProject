import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import './EditPost.css'

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image_url, setImageUrl] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase.from('Posts').select('*').eq('id', id).single();
            if (error) console.error(error);
            else {
                setTitle(data.title);
                setContent(data.content);
                setImageUrl(data.image_url || '');
            }
        };
        fetchPost();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from('Posts')
            .update({ title, content, image_url })
            .eq('id', id);

        if (error) console.error('Error updating post:', error);
        else navigate(`/post/${id}`);
    };

    return (
        <div className='edit-post'>
            <h2>Edit Post</h2>
            <form onSubmit={handleUpdate} className='edit-form'>
                <h3>title</h3>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
                <h3>description</h3>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                <h3>image</h3>
                <input type='text' value={image_url} onChange={(e) => setImageUrl(e.target.value)} />
                <button type='submit'>Save Changes</button>
            </form>
        </div>
    );
};

export default EditPost;