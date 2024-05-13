// UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  '../css/UserList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Storing the token in localStorage
 localStorage.setItem('token', '');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage
        const response = await axios.get('http://localhost:3002/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    const fetchLoggedInUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage
        const response = await axios.get('http://localhost:3002/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoggedInUser(response.data);
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
      }
    };

    fetchUsers();
    fetchLoggedInUser();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      {loggedInUser && <h2>Welcome, {loggedInUser.firstName} {loggedInUser.lastName}</h2>}
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Country</th>
            <th>Area of Interest</th>
            <th>Profile Picture</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.gender}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td>{user.zip}</td>
              <td>{user.country}</td>
              <td>{user.areaOfInterest.join(', ')}</td>
              <td><img src={user.profilePicture} alt="Profile" style={{ width: '50px', height: '50px' }} /></td>
              <td>
                <button className="action-btn" onClick={() => deleteUser(user.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;


