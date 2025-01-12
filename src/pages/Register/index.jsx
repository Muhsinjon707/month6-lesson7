import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from "./index.module.css";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [loading, setLoading] = useState(false);

    function validate(username, email, password, password2) {
        if (username.length < 3) {
            alert("Invalid username: ", username);
            return false;
        }

        if (!email.includes("@") && email.length > 3) {
            alert("Invalid email: ", email);
            return false;
        }

        if (password.length < 3) {
            alert("Invalid password: ", password);
            return false;
        }

        if (password !== password2) {
            alert("Paswords should match!");
            return false;
        }

        return true;
    }

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const isValid = validate(username, email, password, confirmPass);

        if (!isValid) {
            return;
        }

        let user = {
            username: username,
            email: email,
            password: password
        };

        setLoading(true);

        axios.post("https://auth-rg69.onrender.com/api/auth/signup", user, {
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => {
                if (response.status == 200) {
                    navigate("/login");
                }
            })
            .catch(error => {
                if (error.response.status == 400) {
                    alert(error.response?.data?.message);
                }
            })
            .finally(() => setLoading(false));
    }

    return (
        <div>
            <form className={styles.registerForm}>
                <div className={styles.box}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" placeholder="Enter username..." autoComplete="username" value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className={styles.box}>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" placeholder="Enter email..." autoComplete="email" value={email}
                        onChange={(e) => { setEmail(e.target.value); }} />
                </div>
                <div className={styles.box}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder="Enter password..." autoComplete="current-password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className={styles.box}>
                    <label htmlFor="password2">Password:</label>
                    <input type="password" name="password2" id="password2" placeholder="Confirm password..." autoComplete="new-password" value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)} />
                </div>

                <div className="actionButtons">
                    <button type="button" onClick={handleSubmit} disabled = {loading}>{loading ? "Loading..." : "REGISTER"}</button>
                </div>
            </form>
        </div>
    );
}

export default Register;