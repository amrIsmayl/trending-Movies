import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const [errorList, setErrorList] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();
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

  async function submitRegisterForm(e) {
    e.preventDefault();
    setIsloading(true);
    let validationResult = validateRegisterForm();

    if (validationResult.error) {
      setErrorList(validationResult.error.details);
      setIsloading(false);
    }
    else {
      let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signup', user);

      if (data.message === 'success') {
        setIsloading(false);
        navigate('/login')
      }
      else {
        setError(data.message);
        setIsloading(false);
      }
    }
  }

  function validateRegisterForm() {
    let scheme = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(10).required(),
      last_name: Joi.string().alphanum().min(3).max(10).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(new RegExp('^[A-Z][a-z]{3,8}$')).required(),
    })

    return scheme.validate(user, { abortEarly: false });
  }


  return (
    <>
      <div className=' w-75 mx-auto'>
        <h2>Register Now</h2>

        {errorList.map((error , i)=> i === 4 ? <div className=' alert py-2 alert-danger'>password invalid</div>: <div className=' alert py-2 alert-danger'>{error.message}</div>)}
        {error ? <div className=' alert alert-danger'>{error}</div> : ''}

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

          <button type='supmit' className=' btn btn-outline-info'>
            {isloading ? <i className=' fas fa-spinner fa-spin'></i>: "Register"}
          </button>

        </form>

      </div>
    </>
  )
}
