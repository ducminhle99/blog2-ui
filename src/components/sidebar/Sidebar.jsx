import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { blogApi } from '../../api/blogApi';
import { Context } from '../../context/Context';
import "./sidebar.css";

export default function Sidebar() {
    const photoDir = "https://blog2-api-demo.herokuapp.com/images/";
    const [category, setCategory] = useState([]);
    const location = useLocation();
    const { user } = useContext(Context);
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");

    const path = location.pathname.split("/")[2] ? location.pathname.split("/")[2] : null
    useEffect(() => {
        const fetchCat = async () => {
            const res = await blogApi.getCategories();
            setCategory(res)
        }
        fetchCat()

        const fetchUsername = async () => {
            const nameRes = await blogApi.getPosts(`/${path}`);
            setName(nameRes.username)
        }
        if (path) fetchUsername();
    }, [path])


    useEffect(() => {
        const getPhoto = async () => {
            const photoRes = await blogApi.getUserByUsername(name);
            setPhoto(photoRes.avatar)
            console.log(photoRes)
        }
        if (name) getPhoto()
    }, [name])

    console.log(name)
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                {name ? (
                    <>
                        <span className="sidebarTitle">ABOUT ME</span>

                        <img
                            src={photoDir + photo}
                            alt="avatar"
                        />
                        <p>
                            <Link to={`/?user=${name}`} className="link" >{name}</Link>
                        </p>
                    </>
                ) : user && (
                    <>
                        <span className="sidebarTitle">ABOUT ME</span>

                        <img
                            src={photoDir + user.avatar}
                            alt="avatar"
                        />
                        <p>
                            <Link to={`/?user=${user.username}`} className="link">{user.username}</Link>
                        </p>
                    </>

                )}

            </div>
            <div className="sidebarItem">

            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORY</span>
                <ul className="sidebarList">
                    {category.map((c, index) => (
                        <Link to={`/?category=${c.name}`} className="sidebarListItem link" key={index}>{c.name}</Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                </div>
            </div>
        </div>
    )
}
