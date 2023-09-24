import React, { useContext } from 'react'

import { NavLink, useNavigate } from 'react-router-dom';

import { LoginContext } from '../../contexts/loginContext';
import logo from '../../img/logo.png';

import './Navbar.css'

const NavBar = () => {
  const navigate = useNavigate();

  const { userLogin,setModalOpen } = useContext(LoginContext);
  const homeBtn = () => {
    navigate('/');
  }

  return (
    <div className='navbar'>
      <img src={logo} alt="" onClick={homeBtn} style={{ cursor: "pointer" }} />
      <ul className='nav-menu'>
        {!userLogin && <NavLink to='/signup'><li>SignUp</li></NavLink>}
        {!userLogin && <NavLink to='/signin'><li>SignIn</li></NavLink>}
        {userLogin && <NavLink to='/profile'><li>Profile</li></NavLink>}
        {userLogin && <NavLink to='/createpost'><li>Create Post</li></NavLink>}
        {userLogin && <NavLink to='/followingpost'><li>My Following</li></NavLink>}
        {userLogin && <NavLink to='/'><li><button className="primaryBtn" onClick={()=>setModalOpen(true)}>
          LogOut</button></li></NavLink>}

      </ul>
    </div>
  )
}

export default NavBar