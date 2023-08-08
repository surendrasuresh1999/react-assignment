import React from 'react'
import { Link } from 'react-router-dom';
import tvImage from "../../assets/tv.jpg"
const Navbar = () => {
  return (
    <div className='bg-white header'>
      <div className='container d-flex justify-content-between align-items-center py-2'>
        <Link to={'/'}>
          <img src={tvImage} alt='television' height={70} width={70}/>
        </Link>
        {/* this button i am showing only for visibility purpose */}
          <button className='btn btn-outline-primary'>button</button>
      </div>
    </div>
  )
}

export default Navbar;