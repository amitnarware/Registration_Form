// UserDelete.js
import React from 'react';

const UserDelete = ({ onDelete }) => {
  const handleDelete = () => {
    // Delete user record from backend API
    onDelete();
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default UserDelete;
