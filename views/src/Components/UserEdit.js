// UserEdit.js
import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit edited user data to backend API
    console.log(editedUser);
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={editedUser.firstName}
        onChange={handleInputChange}
      />
      {/* Other input fields */}
      <button type="submit">Save</button>
    </form>
  );
};

export default UserEdit;
