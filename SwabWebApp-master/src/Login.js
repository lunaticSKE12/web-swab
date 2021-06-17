import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './login.css';
import Image from 'react-bootstrap/Image';
import Axios from 'axios';
import { useState } from 'react';
import login from './picture/login.png';

function Login(env) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [userList, setUserList] = useState([]);

  const tempUsername = '';
  const tempPassword = '';
  const tempRole = '';

  useEffect(() => {
    Axios.get('http://localhost:3003/login').then((response) => {
      setUserList(response.data);
    });
  }, []);

  // login and save user
  const getUsers = () => {
    Axios.get('http://localhost:3003/login')
      .then((response) => {
        setUserList(response.data);
      })
      .then(() => {
        userList.map((val, key) => {
          if (username === val.username && password === val.password) {
            console.log('yes');
            // save user
            const person = {
              username: username,
              region: val.region,
              role: val.role,
            };
            const temp = window.localStorage.setItem(
              'user',
              JSON.stringify(person)
            );

            window.location.href = '/home';
          }
        });
      });
  };

  // // save user
  // const person = {
  //   name: 'Obaseki Nosa',
  //   location: 'Lagos',
  // };
  // const temp = window.localStorage.setItem('user', JSON.stringify(person));

  return (
    <div className="App container position-absolute top-50 start-50 translate-middle col-8">
      <div className="card mt-4">
        <div className="row">
          <div className="card-body col-sm-6 ">
            <div className="card-content">
              <div className="card-title">
                <h1>Login</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Password:
                    </label>
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    className="mb-3 col-12 btn btn-primary"
                    onClick={getUsers}
                  >
                    Login
                  </button>

                  {/* {userList.map((val, key) => {
                    return (
                      <div className="card">
                        <div className="card-body text-left"> */}
                  {/* {username === val.username ? <p>yes</p> : <p>no</p>} */}
                  {/* <p className="card-text">
                            {username}: {val.username}
                          </p>
                          <p className="card-text">
                            {password}: {val.password}
                          </p>
                          <p className="card-text">
                            {role}: {val.role}
                          </p> */}
                  {/* </div>
                      </div>
                    );
                  })} */}
                </form>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <Image src={login} className="picture" alt="image-login" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
