import React from 'react';
import "./posts.css";
import Post from '../post/Post';

export default function Posts(props) {
    const { posts } = props
    return (
        <div className="posts">
            {
                posts.map((post, index) => (
                    <Post post={post} key={index} />
                ))
            }
        </div>
    )
}
