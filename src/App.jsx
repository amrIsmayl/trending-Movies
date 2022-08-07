import logo from './logo.svg';
import './App.css';

import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Pepole from './Pepole';
import Movies from './Movies';
import Tv from './Tv';
import NotFound from './NotFound';
import Register from './Register';
import Login from './Login';

import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'


function App() {

  const [userData, setUserData] = useState(null);
  let navigate = useNavigate ;

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
    // console.log(decodedToken)
  }

  function logOut(){
    setUserData(null);
    localStorage.removeItem('userToken');
    navigate('/Login');
  }

  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      saveUserData();
    }
  },[])
  

  function ProtectedRoute(props) {
    // console.log(props.children);
    if (localStorage.getItem('userToken') === null) 
    {
      return <Navigate to='/Login' />
    }
    else 
    {
      return props.children ;
    }
  };


  return (
    <>

      <Navbar logOut={logOut} userData={userData} />

      <div className="container">
        <Routes>

          <Route path="" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
          <Route path="pepole" element={<ProtectedRoute><Pepole /></ProtectedRoute>} />
          <Route path="tv" element={<ProtectedRoute><Tv /></ProtectedRoute>} />
          <Route path="login" element={<Login saveUserData={saveUserData} />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />

        </Routes>

      </div>

      <Footer />



    </>
  );
}

export default App;
