import React from 'react'
import { Link } from 'react-router-dom';
import "./post.css";

export default function Post(props) {
    const photoDir = "https://blog2-api-demo.herokuapp.com/images/"
    const { post } = props;
    return (
        <div className="post">
            {post.photo && (<img
                src={photoDir + post.photo}
                alt=""
                className="postImg"
            />)}

            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((c, index) => (
                        <Link to="/" className="sidebarListItem link" key={index}>{c.name}</Link>
                    ))}
                </div>
                <div className="postTitle">
                    <Link to={`/posts/${post._id}`} className="link">{post.title}</Link>
                </div>
                <hr />
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
                <p className="postDesc">
                    {post.description}
                </p>
            </div>
        </div>
    )
}
