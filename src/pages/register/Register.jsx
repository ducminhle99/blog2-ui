import React, { useState } from 'react';
import { blogApi } from '../../api/blogApi';
import './register.css';


export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(false);
        try {
            const res = await blogApi.register({
                username,
                email,
                password,
            });
            res && window.location.replace("/login");
        } catch (error) {
            setErr(true)
            console.log(error)
        }

    }
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            {err && <span style={{ color: "red", marginTop: "10px" }}>Something went wrong!</span>}
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter your username..."
                    onChange={e => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter your email..."
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    className="registerInput"
                    type="password"
                    placeholder="Enter your password..."
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    className="registerButton"
                    type='submit'>
                    Register
                </button>
            </form>
        </div>
    )
}
