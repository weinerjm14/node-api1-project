import React, { useState, useEffect } from 'react';
import AxiosBaseConfig from '../utils/AxiosBaseConfig';

export default function Home() {
  const [users, setUsers] = useState();
  useEffect(() => {
    AxiosBaseConfig()
      .get('/users')
      .then(res => {
        console.log(res);
        setUsers(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <section className='userist-container'>
      <h1>Home</h1>

      <section className='userslist'>
        {users ? (
          users.map(item => {
            return (
              <section className='user' key={item.id}>
                <h4>User: {item.name}</h4>
                <p>Bio: {item.bio}</p>
                <button className='delete'>Delete User</button>
              </section>
            );
          })
        ) : (
          <h2>Finding Friends</h2>
        )}
      </section>
    </section>
  );
}
