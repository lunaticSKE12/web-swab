import React from 'react';
import Orderform from './Orderform';
import './style.css';
// check login
const user = window.localStorage.getItem('user');
console.log(user);
export default function Order() {
  return (
    <div>
      {/* check login */}
      {typeof user !== 'string' ? (
        <p>login first</p>
      ) : (
        <div>
          <Orderform />
        </div>
      )}
    </div>
  );
}
