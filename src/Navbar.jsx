import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container-fluid">
          <Link className="navbar-brand" to="home">Navbar</Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {props.userData ? <>
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to="home">Home</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to="movies">Movies</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to="pepole">Pepole</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to="tv">tv</Link>
                </li>
              </> : ""}

            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">

              <li className="nav-item d-flex align-items-center">
                <i className=' fab mx-2 fa-facebook'></i>
                <i className=' fab mx-2 fa-twitter'></i>
                <i className=' fab mx-2 fa-instagram'></i>
                <i className=' fab mx-2 fa-spotify'></i>
                <i className=' fab mx-2 fa-soundcloud'></i>
              </li>

              {props.userData?<li className="nav-item">
                <span onClick={props.logOut} className="nav-link">Logout</span>
              </li> : <>

              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="login">Login</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="register">Register</Link>
              </li>

              </>}

            </ul>

          </div>
        </div>
      </nav>
    </div>
  )
}
