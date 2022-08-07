import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

  const [errorList, setErrorList] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  function getUserData(e) {
    let myUser = { ...user }; // copy user
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    // console.log(myUser)
  }

  async function submitLoginForm(e) {
    e.preventDefault();
    setIsloading(true);
    let validationResult = validateLoginForm();

    if (validationResult.error) {
      setErrorList(validationResult.error.details);
      setIsloading(false);
    }
    else {
      let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signin', user);

      if (data.message === 'success') {
        setIsloading(false);
        localStorage.setItem('userToken',data.token);
        props.saveUserData();
        navigate('/home')
      }
      else {
        setError(data.message);
        setIsloading(false);
      }
    }
  }

  function validateLoginForm() {
    let scheme = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(new RegExp('^[A-Z][a-z]{3,8}$')).required(),
    })

    return scheme.validate(user, { abortEarly: false });
  }


  return (
    <>
      <div className=' w-75 mx-auto'>
        <h2>Login Now</h2>

        {errorList.map((error , i)=> i === 1? <div className=' alert py-2 alert-danger'>password invalid</div>: <div className=' alert py-2 alert-danger'>{error.message}</div>)}
        {error ? <div className=' alert alert-danger'>{error}</div> : ''}

        <form onSubmit={submitLoginForm}>

          <label htmlFor="email">email :</label>
          <input onChange={getUserData} type='email' className=' form-control mb-2' id='email' name='email' />

          <label htmlFor="password">password :</label>
          <input onChange={getUserData} type='password' className=' form-control mb-2' id='password' name='password' />

          <button type='supmit' className=' btn btn-outline-info'>
            {isloading ? <i className=' fas fa-spinner fa-spin'></i>: "Login"}
          </button>

        </form>

      </div>
    </>
  )
}
