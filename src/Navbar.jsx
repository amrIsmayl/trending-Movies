import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) { // props : to send data between components
  // is variable
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container-fluid pt-4">
          <Link className="navbar-brand ps-5" to="home">Navbar</Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {props.userData ? <> {/* userData : is variable in app.jsx to all user data */}
                {/* if user data show this items */}
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
              </> : ""} {/* but if not user data don't show this items */}

            </ul>
            
            <ul className="navbar-nav mb-2 mb-lg-0">

              <li className="nav-item d-flex align-items-center pe-5">
                <a href="https://www.facebook.com/" target="_blank"><i className=' fab mx-2 fa-facebook'></i></a>
                <a href="https://www.twitter.com/" target="_blank"><i className=' fab mx-2 fa-twitter'></i></a>
                <a href="https://www.instagram.com/" target="_blank"><i className=' fab mx-2 fa-instagram'></i></a>
                <a href="https://open.spotify.com/" target="_blank"><i className=' fab mx-2 fa-spotify'></i></a>
              </li>

              {/* if user data show this item */}
              {props.userData ?
                <li className="nav-item">
                  <span onClick={props.logOut} className="nav-link pe-5 pointer">Logout</span>
                </li>
                : <> 
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="login">Login</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="register">Register</Link>
                  </li>

                </>}{/* but if not user data show this items */}

            </ul>

          </div>
        </div>
      </nav>
    </div>
  )
}
