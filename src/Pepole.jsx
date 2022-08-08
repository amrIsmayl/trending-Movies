import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function Pepole() {

  const [trendingpeopole, setTrendingPeopole] = useState([]);

  async function getTrending() {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=fedb2e6d7633d3698e236eecc75da7ca`);
    setTrendingPeopole(data.results);

  }

  useEffect(() => {
    getTrending();

  }, [])

  
  return (
    <>
    {trendingpeopole ? <div className="row justify-content-center py-5">
    {trendingpeopole.map((person , i) => <div key={i} className="col-md-2 py-3">
          <div className="actor">
          <Link to={`/pepoledetails/${person.id}`}>
          {person.profile_path === null ? <img src={require("./111.png")} className=" w-100 pt-5"/> : <img src={'https://image.tmdb.org/t/p/original/' + person.profile_path} alt="" className="w-100" />}
          <h3 className=' h6 my-4 text-center'>{person.name}</h3>
            </Link>
          </div>
        </div>)}
      </div> : <div className=' vh-100 d-flex justify-content-center align-items-center'>
        <i className=' fas fa-spinner fa-spin fa-3x'></i>
      </div>}
      </>
  )
}
