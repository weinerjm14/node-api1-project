import React, { useState, useEffect } from 'react';
import AxiosBaseConfig from '../utils/AxiosBaseConfig';

export default function AddUser() {
  const [newUserData, setNewUserData] = useState({
    name: '',
    bio: '',
  });
  const addNewUser = e => {
    e.preventDefault();
    AxiosBaseConfig()
      .post('/users', newUserData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    window.location.reload(false);
  };
  const handleChange = e => {
    console.log('newuserdata: ', newUserData);
    setNewUserData({
      ...newUserData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className='adduser-form'>
      <form onSubmit={addNewUser}>
        <lable>Name:</lable>
        <input
          type='text'
          name='name'
          value={newUserData.name}
          onChange={handleChange}
        />
        <label>Bio:</label>
        <input
          type='text'
          name='bio'
          value={newUserData.bio}
          onChange={handleChange}
        />
        <button>Add New User</button>
      </form>
    </section>
  );
}
