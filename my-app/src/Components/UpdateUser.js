import React, { useState, useEffect } from 'react';
import AxisoBaseConfig from '../utils/AxiosBaseConfig';
import { useHistory } from 'react-router-dom';

export default function UpdateUser() {
  const [user, setUser] = useState();
  const [userUdate, setUserUpdate] = useState({
    name: '',
    bio: '',
  });
  const history = useHistory();
  const id = window.location.toString().split('?')[1];
  console.log(id);
  const updatesUser = e => {
    e.preventDefault();
    AxisoBaseConfig()
      .put(`/users/${id}`, userUdate)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    history.push('/');
  };
  const getUserById = () => {
    AxisoBaseConfig()
      .get(`/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  };
  const handleChange = e => {
    setUserUpdate({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    getUserById();
  }, []);
  return (
    <section className='update-pagecontainer'>
      {user ? (
        <section className='update-container'>
          <h3>Update {user.name}</h3>
          <section className='user' key={user.id}>
            <h3>Current Info</h3>
            <h4>User: {user.name}</h4>
            <p>Bio: {user.bio}</p>
          </section>
          <section className='update-info'>
            <form onSubmit={updatesUser}>
              <lable>Name:</lable>
              <input
                type='text'
                name='name'
                value={userUdate.name}
                onChange={handleChange}
              />
              <label>Bio:</label>
              <input
                type='text'
                name='bio'
                value={userUdate.bio}
                onChange={handleChange}
              />
              <button>Update User Info</button>
            </form>
          </section>
          >
        </section>
      ) : (
        <h2>Finding User</h2>
      )}
    </section>
  );
}
