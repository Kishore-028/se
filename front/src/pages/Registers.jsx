import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Register({setisLoggedin}) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const res = await axios.post("http://localhost:5000/register", {
                name: form.name,
                email: form.email,
                password: form.password
            });

            setisLoggedin(true)
            sessionStorage.setItem("isLoggedin","true")
            alert(res.data.message);
            console.log(res.data);

            
            if (res.status === 201) {
                navigate("/");
            }

        } catch (err) {
            
            console.error("Registration error:", err.response?.data || err.message);
            alert(err.response?.data.message || 'Registration failed');
        }
    };

    return (
        <div>
            <center>
                <h1>Register Page</h1>
                <form onSubmit={handleSubmit}>
                    <label>Name:
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        />
                    </label>
                    <br />
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
                    <button type="submit">Submit</button>
                </form>
                <br />
                <label>If you are already registered </label>
                <a href="/">Login</a>
            </center>
        </div>
    );
}

export default Register;
