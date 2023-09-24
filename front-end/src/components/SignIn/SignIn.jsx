import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import { LoginContext } from '../../contexts/loginContext';
import logo from '../../img/logo.png';
import './Signin.css'

const ValidateEmail = (mail)=> {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true)
  }
  return (false)
}

const SignIn = () => {
  const navigate = useNavigate();
  const {setUserLogin} = useContext(LoginContext);
  
  const [data, setData] = useState({password: '', email: '' });

  const {password, email } = data;

  const userData = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const postData = async () => {
      const emailRegex = ValidateEmail(email);
      if(!emailRegex){
        toast.error("You have entered an invalid email address!")
      }else{
      const res = await fetch('/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const resData = await res.json();
      if (res.status === 200) {
        // console.log("token",resData);
        localStorage.setItem("jwt",resData.token);
        localStorage.setItem("user",JSON.stringify(resData.user));

        setUserLogin(true);
        toast.success("Sign In Successful");
        setData({password: '', email: '' })
        navigate('/');
      } else {
        toast.error(resData.error);
      }
    }
  }


  return (
    <div className='signIn'> 
      <div>
        <div className="loginForm">
          <img className="signUpLogo" src={logo} alt="" />
          <div>
            <input type="email" name="email" id="email" placeholder='Email' onChange={(e) => userData(e)} value={email} />
          </div>
          <div>
            <input type="password" name="password" id="password" placeholder='Password' onChange={(e) => userData(e)} value={password} />
          </div>
          <input type="submit" value="Sign In" id="login-btn" onClick={postData} />

        </div>

        <div className="loginForm2">
          Don't have an account ?
          <NavLink to='/signup'>
          <span style={{color:'blue',cursor:'pointer'}}>Sign Up</span>
          </NavLink>
        </div>

      </div>
    </div>
  )
}

export default SignIn