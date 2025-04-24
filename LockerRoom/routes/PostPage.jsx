import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import './PostPage.css';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        }
        const fetchPostAndComments = async () => {
            const { data: postData, error: postError } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();
    
            if (postError) {
                console.error('Error fetching post:', postError);
                return;
            }
    
            setPost(postData);
    
            const { data: commentsData, error: commentsError } = await supabase
                .from('Comments')
                .select('*')
                .eq('post_id', id)
                .order('created_at', { ascending: true });
    
            if (commentsError) {
                console.error('Error fetching comments:', commentsError);
            } else {
                setComments(commentsData);
            }
        };
        fetchUser();
        fetchPostAndComments();
    }, [id]);

    const handleUpvote = async () => {
        const { data, error } = await supabase
            .from('Posts')
            .update({ upvotes: post.upvotes + 1})
            .eq('id', id)
            .select()
            .single();

        if (error) console.error(error);
        else setPost(data);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('Comments')
            .insert([
                { post_id: id, content: newComment }
            ]);
    
        if (error) {
            console.error('Error adding comment:', error);
        } else {
            setNewComment('');
            setComments([...comments, ...data]); 
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (!confirmDelete) return;
    
        const { error } = await supabase
            .from('Posts')
            .delete()
            .eq('id', id);
    
        if (error) {
            console.error('Error deleting post:', error);
        } else {
            navigate('/');
        }
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className='post-details'>
            {user?.id === post.user_id && (
                <div className='post-actions'>
                    <button onClick={() => navigate(`/edit/${post.id}`)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
            <h1>{post.title}</h1>
            <p>Posted: {new Date(post.created_at).toLocaleString()}</p>
            {post.image_url && <img src={post.image_url} alt='Post' />}
            <p>{post.content}</p>
            <p>{post.upvotes} Upvotes</p>
            <button onClick={handleUpvote}>Upvote</button>

            <hr />
            <h3>Comment Section</h3>
            <div className='comment-section'>
            <form onSubmit={handleCommentSubmit}>
                <textarea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Leave a comment!"
                    required
                />
                <button type='submit'>+</button>
            </form>
            <div className='comments'>
                {comments.map((comment) => (
                    <div key={comment.id} className='comment'>
                        <p>{comment.content}</p>
                        <small>{new Date(comment.created_at).toLocaleString()}</small>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default PostPage;