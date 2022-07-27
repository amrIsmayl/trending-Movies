import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
        <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <Link class="navbar-brand" to="home">Navbar</Link>
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="home">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="movies">Movies</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="pepole">Pepole</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="tv">tv</Link>
        </li>
        

        
      </ul>
      
    </div>
  </div>
</nav>
    </div>
  )
}
