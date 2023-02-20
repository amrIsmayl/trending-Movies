import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// useNavigate : hook in react-router-dom to create navigation automatic
// by aleb been el pages with automatic 
// we using when registration success, Move to next page

export default function Register() {

  const [errorList, setErrorList] = useState([]); // to any error in user data in register opration

  const [isloading, setIsloading] = useState(false); // to loading opration by default false

  const [error, setError] = useState(""); // set error variable to fail registration

  let navigate = useNavigate(); // create variable to useNavigate because using after soon

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age: 0,
    email: '',
    password: ''
  });

  function getUserData(e) { // e = by default all information in user data whin used function
    let myUser = { ...user }; // deep copy user 
    myUser[e.target.name] = e.target.value; // to name in user data
    setUser(myUser);
  }

  async function submitRegisterForm(e) { // e = in here because control to behavior>"solok" form tage

    e.preventDefault(); // preventDefault = this function to stop default reload action to form tage

    setIsloading(true); // to loading opration = do it true because is loading now to reception data from database

    let validationResult = validateRegisterForm(); // to validate registration data

    if (validationResult.error) {

      setErrorList(validationResult.error.details); // if error message set error in error variable

      setIsloading(false); // came again to loading opration by default false because data has been
    }
    else {
      let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signup', user);
      // in post method we need send 2 element "URL" and "new datq"

      if (data.message === 'success') {
        setIsloading(false); // came again to loading opration by default false because data has been
        navigate('/login') // the variable navigate giving name the next page 
      }
      else {
        setError(data.message); // set new error message in error variable when fail register

        setIsloading(false); // came again to loading opration by default false because data has been
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
    // abortEarly = to show all error messages in error variable
    // in default "abortEarly: true" but we change it to "abortEarly: false"
    // user = to validate on user data
  }


  return (
    <>
      <div className=' w-75 mx-auto pt-5'>
        <h2 className=' mb-4'>Register Now</h2>

        {errorList.map((error, i) => i === 4 ? <div className=' alert py-2 alert-danger'>password invalid</div> : <div className=' alert py-2 alert-danger'>{error.message}</div>)}
        {/*this step to show error when false validate data*/}
        {/*number "4" : change form message error to password because not show patern validate*/}

        {error ? <div className=' alert alert-danger'>{error}</div> : ''}
        {/*this step to if error in respons then show error in new dev */}

        <form onSubmit={submitRegisterForm}>
          {/*onSubmit = onClick in button tage but we used this attribute because whin click enter in keybord*/}

          <label htmlFor="first_name" className=' my-2'>first-name :</label>
          <input onChange={getUserData} className=' form-control mb-2' id='first_name' name='first_name' />

          <label htmlFor="last_name" className=' my-2'>last-name :</label>
          <input onChange={getUserData} className=' form-control mb-2' id='last_name' name='last_name' />

          <label htmlFor="age" className=' my-2'>age :</label>
          <input onChange={getUserData} type='number' className=' form-control mb-2' id='age' name='age' />

          <label htmlFor="email" className=' my-2'>email :</label>
          <input onChange={getUserData} type='email' className=' form-control mb-2' id='email' name='email' />

          <label htmlFor="password" className=' my-2'>password :</label>
          <input onChange={getUserData} type='password' className=' form-control mb-2' id='password' name='password' />

          <button type='supmit' className=' btn btn-outline-info mt-4'>
            {isloading ? <i className=' fas fa-spinner fa-spin'></i> : "Register"}
            {/*create spinner to wait loading opration but if not loading opration show "Register" */}
          </button>

        </form>

      </div>
    </>
  )
}
