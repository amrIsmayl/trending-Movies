import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div class="container-fluid">
          <Link class="navbar-brand" to="home">Navbar</Link>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <ul class="navbar-nav me-auto mb-2 mb-lg-0">

              {props.userData ? <>
                <li class="nav-item">
                  <Link class="nav-link " aria-current="page" to="home">Home</Link>
                </li>

                <li class="nav-item">
                  <Link class="nav-link " aria-current="page" to="movies">Movies</Link>
                </li>

                <li class="nav-item">
                  <Link class="nav-link " aria-current="page" to="pepole">Pepole</Link>
                </li>

                <li class="nav-item">
                  <Link class="nav-link " aria-current="page" to="tv">tv</Link>
                </li>
              </> : ""}

            </ul>
            <ul class="navbar-nav mb-2 mb-lg-0">

              <li class="nav-item d-flex align-items-center">
                <i className=' fab mx-2 fa-facebook'></i>
                <i className=' fab mx-2 fa-twitter'></i>
                <i className=' fab mx-2 fa-instagram'></i>
                <i className=' fab mx-2 fa-spotify'></i>
                <i className=' fab mx-2 fa-soundcloud'></i>
              </li>

              {props.userData?<li class="nav-item">
                <span onClick={props.logOut} class="nav-link">Logout</span>
              </li> : <>

              <li class="nav-item">
                <Link class="nav-link" aria-current="page" to="login">Login</Link>
              </li>

              <li class="nav-item">
                <Link class="nav-link" aria-current="page" to="register">Register</Link>
              </li>

              </>}

            </ul>

          </div>
        </div>
      </nav>
    </div>
  )
}
