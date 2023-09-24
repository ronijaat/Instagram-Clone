import logo from './logo.svg';
import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/Navbar/NavBar';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Profile from './components/Profile/Profile';
import CreatePost from './components/CreatePost/CreatePost'
import Modal from './components/Modal/Modal';

import { LoginContext } from './contexts/loginContext';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useContext, useState } from 'react';
import UserProfile from './components/UserProfile/UserProfile';
import MyFollowingPost from './components/MyFollowingPost/MyFollowingPost';

function App() {

  const {modalOpen} = useContext(LoginContext)

  return (
    < BrowserRouter >
      <div className="App">
        <NavBar />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/signin' element={<SignIn/>}></Route>
          <Route exact path='/profile' element={<Profile/>}></Route>
          <Route path='/createpost' element={<CreatePost/>}></Route>
          <Route path='/profile/:userid' element={<UserProfile/>}></Route>
          <Route path='/followingpost' element={<MyFollowingPost/>}></Route>


        </Routes>
        <ToastContainer />
        {
          modalOpen && <Modal />
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
