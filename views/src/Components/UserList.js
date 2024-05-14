import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../css/UserList.css';
import UserEdit from './UserEdit';
// import ReactModal from 'react-modal';

// ReactModal.setAppElement('#root');

const API_URL = 'http://localhost:3002';

const useToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token is missing. Redirecting to login page.');
    window.location.href = '/login';
    return null; // Return null if token is missing
  }
  return token;
};

const fetchUsers = async (token) => {
  try {
    console.log('Token in fetchUsers:', token);
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: token, // Pass the token directly without 'Bearer '
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access. Please login again.');
    }
    return [];
  }
};

const fetchLoggedInUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching logged-in user:', error);
    return null;
  }
};

const deleteUser = async (id, token) => {
  try {
    await axios.delete(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const token = useToken();

  

  useEffect(() => {
    const fetchAllData = async () => {
      if (token) {
        try {
          const usersData = await fetchUsers(token);
          const loggedInUserData = await fetchLoggedInUser(token);
          console.log('Users Data:', usersData);
          console.log('Logged In User Data:', loggedInUserData);
          setUsers(usersData);
          setLoggedInUser(loggedInUserData);
        } catch (error) {
          console.error('Error fetching data:', error);
          if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Please login again.');
            // Handle re-authentication or token refresh here
          }
        }
      }
    };
    fetchAllData();
  }, [token]);

  const handleDeleteUser = async (id) => {
    await deleteUser(id, token);
    setUsers(users.filter((user) => user.id !== id));
  };


  const handleEditUser = (id) => {
    setSelectedUserId(id);
    setModalIsOpen(true);
  };   

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUserId(null);
  };


  return (
    <div>
      {loggedInUser && (
        <h2>
          Welcome, {loggedInUser.firstName} {loggedInUser.lastName}
        </h2>
      )}
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
              <td>{user.areaOfInterest}</td>
              <td>
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  style={{ width: '50px', height: '50px' }}
                />
              </td>
              <td>
              <button className="action-btn" onClick={() => handleEditUser(user.id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="action-btn" onClick={() => handleDeleteUser(user.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

       {/* UserEdit modal */}
      
     
    </div>
  );
};

export default UserList;



