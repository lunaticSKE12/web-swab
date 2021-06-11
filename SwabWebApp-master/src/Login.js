import React from 'react';
import './login.css';
import Image from 'react-bootstrap/Image';
import Axios from 'axios';
import { useState } from 'react';
import login from './picture/login.png';

function Login(env) {
  // const [userList, setUserList] = useState([]);

  // const getUsers = () => {
  //   Axios.get('http://localhost:3001/user').then((response) => {
  //     setUserList(response.data);
  //   });
  // };

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
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
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
                      />
                    </div>
                  </div>
                  {/* <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="checkRememberPassword"
          />
          <label className="form-check-label" for="checkRememberPassword">
            Remember password
          </label>
        </div> */}
                  <button
                    className="mb-3 col-12 btn btn-primary"
                    // onClick={getUsers}
                  >
                    Login
                  </button>

                  {/* {userList.map((val, key) => {
                    return (
                      <div className="card">
                        <div className="card-body text-left">
                          <p className="card-text">Name: {val.first_name}</p>
                        </div>
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
