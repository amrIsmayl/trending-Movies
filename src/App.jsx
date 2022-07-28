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


import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    < >



      <Navbar />

      <div className="container-fluid">
        <Routes>

          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="pepole" element={<Pepole />} />
          <Route path="tv" element={<Tv />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />

        </Routes>

      </div>

      <Footer />



    </>
  );
}

export default App;
