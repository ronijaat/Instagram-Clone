import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


import logo from '../../img/logo.png';

import './Signup.css'

const SignUp = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({ name: '', userName: '', password: '', email: '' });

  const { name, userName, password, email } = data;

  const userData = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const ValidateEmail = (mail)=> {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }

  const CheckPassword = (inputtxt)=> {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (inputtxt.match(passw)) {
      return true;
    }
    else {
      return false;
    }
  }

  const postData = async () => {
    //checking email
    const emailRegex = ValidateEmail(email);
    const passRegex = CheckPassword(password);

    if (!emailRegex) {
      toast.error("You have entered an invalid email address!")
    } 
    else if(!passRegex){
      toast.error("Enter password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter")
    }
    else {
      const res = await fetch('/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const resData = await res.json();
      console.log(resData);
      if (res.status === 200) {
        toast.success("Sign Up Successful");
        setData({ name: '', userName: '', password: '', email: '' })
        navigate('/signin');
      } else {
        toast.error(resData.error);
      }
    }
  }

  return (
    <div className='signUp'>
      <div className="form-container">
        <div className='form'>
          <img className='signUpLogo' src={logo} alt="" />
          <p className='loginPara'>Sign up to see photos and videos <br />from your friends</p>

          <div>
            <input type="email" name='email' id='email' placeholder='Email' onChange={(e) => userData(e)} value={email} />
          </div>
          <div>
            <input type="text" name='name' id='name' placeholder='Full Name' onChange={(e) => userData(e)} value={name} />
          </div>
          <div>
            <input type="text" name='userName' id='username' placeholder='Username' onChange={(e) => userData(e)} value={userName} />
          </div>
          <div>
            <input type="password" name='password' id='password' placeholder='Password' onChange={(e) => userData(e)} value={password} />
          </div>

          <p className='loginPara' style={{
            fontSize: "12px",
            margin: "3px 0px"
          }}>
            By signing up,you agree to out Terms, <br />
            privacy policy and cookies policy
          </p>

          <input type="submit" id='submit-btn' value="Sign Up" onClick={postData} />
        </div>

        <div className='form2'>
          Already have an account ?
          <NavLink to='/signin'>
            <span style={{ color: 'blue', cursor: 'pointer' }}>Sign In</span>
          </NavLink>

        </div>

      </div>
    </div>
  )
}

export default SignUp