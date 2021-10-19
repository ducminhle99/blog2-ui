import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import { blogApi } from '../../api/blogApi';
import { Context } from '../../context/Context';
import "./singlePost.css";


export default function SinglePost() {
    const photoDir = "https://blog2-api-demo.herokuapp.com/images/"
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({})
    const { user } = useContext(Context);

    useEffect(() => {
        const getPost = async () => {
            const res = await blogApi.getPosts(`/${path}`);
            setPost(res)
        }
        getPost()
    }, [path])

    const handleDelete = async () => {
        try {
            await blogApi.deletePost(path, user.username)
            window.location.replace("/");
        } catch (err) {

        }
    }

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">

                <img
                    className="singlePostImg"
                    src={photoDir + post.photo}
                    alt="" />

                <h1 className="singlePostTitle">
                    {post.title}

                    {user && user.username === post.username ? (
                        <div className="singlePostEdit">
                            <Link to={`/write?id=${post._id}`} className="singlePostIcon far fa-edit"></Link>
                            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                        </div>
                    ) : <> </>}

                </h1>
                <div className="singlePostInfo">
                    <span>
                        tác giả:
                        <b className="singlePostAuthor">
                            <Link to={`/?user=${post.username}`}>{post.username}</Link>
                        </b>
                    </span>
                    <span>{new Date(post.createdAt).toDateString()}</span>
                </div>
                <p className="singlePostDesc">
                    {post.description}
                </p>
            </div>
        </div>
    )
}
