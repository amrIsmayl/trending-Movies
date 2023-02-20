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
import MovieDetails from './MovieDetails'
import TvDetails from './TvDetails';
import PepoleDetails from './PepoleDetails';

import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // jwtDecode : to Transformation token to object Contain all data to user 
import React, { useEffect, useState } from 'react'


function App() {

  const [userData, setUserData] = useState(null);
  let navigate = useNavigate;

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken'); // get token to transformation token becaose get user data
    let decodedToken = jwtDecode(encodedToken); // to transformation token becaose get user data
    setUserData(decodedToken); // set user data in object becaose using 
  }

  function logOut() {
    setUserData(null);
    localStorage.removeItem('userToken');
    navigate('/Login');
  }

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      saveUserData();
    }
  }, [])

  function ProtectedRoute(props) {
    if (localStorage.getItem('userToken') === null) {
      return <Navigate to='/Login' />
    }
    else {
      return props.children;
    }
  };

  return (
    <>
      <Navbar logOut={logOut} userData={userData} /> {/* userData={userData} : to send user data as props to navbar component */}

      <div className="container">
        <Routes>

          <Route path="" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
          <Route path="pepole" element={<ProtectedRoute><Pepole /></ProtectedRoute>} />
          <Route path="tv" element={<ProtectedRoute><Tv /></ProtectedRoute>} />
          <Route path="moviedetails" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} >
            <Route path=":id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
          </Route>
          <Route path="tvdetails" element={<ProtectedRoute><TvDetails /></ProtectedRoute>} >
            <Route path=":id" element={<ProtectedRoute><TvDetails /></ProtectedRoute>} />
          </Route>
          <Route path="pepoledetails" element={<ProtectedRoute><PepoleDetails /></ProtectedRoute>} >
            <Route path=":id" element={<ProtectedRoute><PepoleDetails /></ProtectedRoute>} />
          </Route>
          <Route path="login" element={<Login saveUserData={saveUserData} />} /> 
          {/* saveUserData={saveUserData} : to send function "saveUserData()" as props to login component */}
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />

        </Routes>

      </div>

      <Footer />



    </>
  );
}

export default App;
