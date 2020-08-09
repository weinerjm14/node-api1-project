import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AxiosBaseConfig from '../utils/AxiosBaseConfig';
import Adduser from './AddUser';

export default function Home() {
  const [users, setUsers] = useState();
  const history = useHistory();
  const deleteUser = (e, uid) => {
    e.preventDefault();

    AxiosBaseConfig()
      .delete(`/users/${uid}`)
      .then(res => {
        console.log(res);
        getUsers();
      })
      .catch(err => console.log(err));
  };
  const getUsers = () => {
    AxiosBaseConfig()
      .get('/users')
      .then(res => {
        console.log(res);
        setUsers(res.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className='userist-container'>
      <h1>Home</h1>
      <Adduser />

      <section className='userslist'>
        {users ? (
          users.map(item => {
            return (
              <section className='user' key={item.id}>
                <h4>User: {item.name}</h4>
                <p>Bio: {item.bio}</p>
                <button
                  className='delete'
                  onClick={e => deleteUser(e, item.id)}
                >
                  Delete User
                </button>
                <button
                  onClick={e => {
                    history.push(`/update-user/?${item.id}`);
                  }}
                >
                  Update User
                </button>
              </section>
            );
          })
        ) : (
          <h2>Finding Users</h2>
        )}
      </section>
    </section>
  );
}
