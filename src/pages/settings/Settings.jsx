import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Context } from '../../context/Context';
import './settings.css';

export default function Settings() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const { user, dispatch } = useContext(Context);
    const photoDir = "https://blog2-api-demo.herokuapp.com/images/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updateUser = {
            userId: user._id,
            username,
            email,
            password
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updateUser.avatar = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {
                dispatch({ type: "UPDATE_FAILURE" });
            }
        }
        try {
            const res = await axios.put("/users/" + user._id, updateUser);
            console.log(res.data)
            setSuccess(true)
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            window.location.replace("/")

        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE" });
            console.log(error)
        }
    }
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src={file ? URL.createObjectURL(file) : photoDir + user.avatar}
                            alt=""
                        />
                        <input
                            id="fileInput"
                            type="file"
                            className="settingsPPInput"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input
                        required="true"
                        type="text"
                        placeholder={user.username}
                        name="name"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    <input
                        required="true"
                        type="email"
                        placeholder={user.email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    <label>Password</label>
                    <input
                        required="true"
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <button className="settingsSubmitButton" type="submit">
                        Update
                    </button>
                    {success && (
                        <span
                            style={{ color: "red", textAlign: "center", marginTop: "20px" }}
                        >
                            Profile has been updated...
                        </span>
                    )}
                </form>
            </div>
        </div>
    )
}
