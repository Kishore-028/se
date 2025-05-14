import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login({ setisLoggedin }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/login", {
                email: form.email,
                password: form.password
            });

            if (res.status === 200) {
                alert(res.data.message);
                setisLoggedin(true);
                sessionStorage.setItem("isLoggedin", "true");
                navigate("/home"); 
            } else {
                alert("Login failed");
            }

        } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
            alert(err.response?.data.message || "Login failed");
        }
    };

    return (
        <div>
            <center>
                <h1>Login Page</h1>
                <form onSubmit={handleSubmit}>
                    <label>Email:
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>Password:
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                </form>
                <br />
                <label>Don't have an account?</label>
                <a href="/register"> Register</a>
            </center>
        </div>
    );
}

export default Login;
