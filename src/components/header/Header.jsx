import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from "../../context/Context";

import "./header.css"

export default function Header() {
    const { user, dispatch } = useContext(Context);
    const photoDir = "https://blog2-api-demo.herokuapp.com/images/";

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <div className="top">
            <Link to="/" className="topLeft link">
                <i className="topIcon fas fa-blog"></i>
                <h2>Blog app</h2>
            </Link>
            <div className="topCenter">
                <ul className="topList">
                    <Link to="/" className="topMenu link">HOME</Link>
                    <Link to="contact" className="topMenu link">CONTACT</Link>
                    <Link to="/write" className="topMenu link">WRITE</Link>
                    <li className="topMenu link" onClick={handleLogout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                    <Link to="/settings">
                        <img className="topImg" src={photoDir + user.avatar} alt="" />
                    </Link>
                ) : (
                    <ul className="topList">
                        <li className="topMenu link">
                            <Link className="link" to="/login">
                                LOGIN
                            </Link>
                        </li>
                        <li className="topMenu link">
                            <Link className="link" to="/register">
                                REGISTER
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}
