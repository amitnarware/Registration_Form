// UserEdit.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/UserEdit.css'

const UserEdit = ({ user }) => {
  const [editedUser, setEditedUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    city: user.city,
    state: user.state,
    zip: user.zip,
    country: user.country,
    interests: user.interests,
    profilePicture: user.profilePicture,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3002/users/${user.id}`, editedUser);
      console.log('User updated:', response.data);
      // Reset form fields
      setEditedUser({
        firstName: '',
        lastName: '',
        gender: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        interests: [],
        profilePicture: null,
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="user-edit-form">
      <input
        type="text"
        name="firstName"
        value={editedUser.firstName}
        onChange={handleInputChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        value={editedUser.lastName}
        onChange={handleInputChange}
        placeholder="Last Name"
      />
      <input
        type="text"
        name="gender"
        value={editedUser.gender}
        onChange={handleInputChange}
        placeholder="Gender"
      />
      <input
        type="text"
        name="city"
        value={editedUser.city}
        onChange={handleInputChange}
        placeholder="City"
      />
      <input
        type="text"
        name="state"
        value={editedUser.state}
        onChange={handleInputChange}
        placeholder="State"
      />
      <input
        type="text"
        name="zip"
        value={editedUser.zip}
        onChange={handleInputChange}
        placeholder="Zip"
      />
      <input
        type="text"
        name="country"
        value={editedUser.country}
        onChange={handleInputChange}
        placeholder="Country"
      />
      <input
        type="text"
        name="areaOfInterests"
        value={editedUser.interests}
        onChange={handleInputChange}
        placeholder="areaOfInterests"
      />
      <input
        type="text"
        name="profilePicture"
        value={editedUser.profilePicture}
        onChange={handleInputChange}
        placeholder="Profile Picture URL"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserEdit;

