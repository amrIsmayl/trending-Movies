import React, { useState } from 'react'

export default function Register() {

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age: 0,
    email: '',
    password: ''
  });

  function getUserData(e) {
    let myUser = { ...user }; // copy user
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(myUser)
  }

  function submitRegisterForm(e) {
    e.preventDefault();
    console.log(user)
  }


  return (
    <>
      <div className=' w-75 mx-auto'>
        <h2>Register Now</h2>

        <form onSubmit={submitRegisterForm}>
          <label htmlFor="first_name">first-name :</label>
          <input onChange={getUserData} className=' form-control mb-2' id='first_name' name='first_name' />

          <label htmlFor="last_name">last-name :</label>
          <input onChange={getUserData} className=' form-control mb-2' id='last_name' name='last_name' />

          <label htmlFor="age">age :</label>
          <input onChange={getUserData} type='number' className=' form-control mb-2' id='age' name='age' />

          <label htmlFor="email">email :</label>
          <input onChange={getUserData} type='email' className=' form-control mb-2' id='email' name='email' />

          <label htmlFor="password">password :</label>
          <input onChange={getUserData} type='password' className=' form-control mb-2' id='password' name='password' />

          <button type='supmit' className=' btn btn-outline-info'>Rigester</button>

        </form>

      </div>
    </>
  )
}
