import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Home({ setisLoggedin }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  

  // Fetch all users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/users');
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        alert("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    setisLoggedin(false);
    sessionStorage.clear();
    navigate("/register");
  };

  return (
    <div>
      <h1>Home</h1>

      <h3>Registered Users</h3>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <strong>Name:</strong> {user.name} <br />
              <strong>Email:</strong> {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}

      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Hello</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              hii
            </td>
            <td>kishore</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Home;
