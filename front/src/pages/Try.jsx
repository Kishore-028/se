import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Try() {
    const [form, setForm] = useState({ name: "" });
    const navigate=useNavigate();
     const users = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' }
  ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/try", {
                name: form.name
            });
            alert(res.data.message);
            navigate("/home")
        } catch (err) {
            console.error("error", err);
            alert("Error: " + err.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, [e.target.name]: e.target.value })
                        }
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <br />
            <h1>hello</h1>
            <>
            {users.map((user,ind) =>(
                <tr key={ind}>
                    <td>Name : {user.name}</td>

                </tr>
                

            ))};
            </>
        </div>
    );
}

export default Try;
