import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogApi } from '../../api/blogApi';
import { Context } from '../../context/Context';
import "./login.css";

export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);
    const [err, setErr] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(false);
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await blogApi.login({
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
            setErr(true);
        }
    };

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            {err && <span style={{ color: "red", marginTop: "10px" }}>Something went wrong!</span>}
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    className="loginInput"
                    type="text"
                    placeholder="Enter your username..."
                    ref={userRef}
                />
                <label>Password</label>
                <input
                    className="loginInput"
                    type="password"
                    placeholder="Enter your password..."
                    ref={passwordRef}
                />
                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            </form>
            <div className="loginRegister">
                <span>If you dont have account <Link to="/register">register</Link> now</span>
            </div>
        </div>
    )
}
