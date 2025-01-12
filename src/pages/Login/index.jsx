import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from "./index.module.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    function validate(username, password) {
        if (username.length < 3) {
            alert("Invalid username: ", username);
            return false;
        }

        if (password.length < 3) {
            alert("Invalid password: ", password);
            return false;
        }

        return true;
    }

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const isValid = validate(username, password);

        if (!isValid) {
            return;
        }

        let user = {
            username: username,
            password: password
        };

        setLoading(true);

        axios.post("https://auth-rg69.onrender.com/api/auth/signin", user, {
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => {
                if (response.status == 200) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    localStorage.setItem("token", response.data.accessToken); 
                    navigate("/");
                }
            })
            .catch(error => {
                if (error.status == 404 || error.status == 401) {
                    alert(error.response?.data?.message);
                }
            })
            .finally(() => setLoading(false));
    }

    return (
        <div>
            <form className={styles.loginForm}>
                <div className={styles.box}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" placeholder="Enter username..." autoComplete="username" value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className={styles.box}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder="Enter password..." autoComplete="current-password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="actionButtons">
                    <button type="button" onClick={handleSubmit} disabled={loading}>{loading ? "Loading..." : "LOGIN"}</button>
                </div>
            </form>
        </div>
    );
}

export default Login;