import React, { useEffect, useState } from 'react'
import './Profile.css'
import PostDetails from '../PostDetails/PostDetails';
import ProfilePic from '../ProfilePic/ProfilePic';

const Profile = () => {

  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [onepost,setOnePost] = useState("");
  const [show, setShow] = useState(false);
  const [changePic, setChangePic] = useState(false);

  const toggleDetails = (post) => {
    setShow(prev => !prev);
    setOnePost(post);
  }

  const changeProfile = () => {
    setChangePic(prev => !prev)
  }

  useEffect(() => {
    const posData = async () => {
      const res = await fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      })
      const data = await res.json();
      setUser(data.user);
      setPosts(data.post);
    }
    posData();
  }, [])

  return (
    <div className='profile'>
      {/* Profile Frame  */}
      <div className="profile-frame">
        <div className="profile-pic">
          <img src={user.Photo? user.Photo : picLink} alt="" onClick={changeProfile} />
        </div>

        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{posts?.length} posts</p>
            <p>{user?.followers?.length} followers</p>
            <p>{user?.following?.length} following</p>
          </div>
        </div>

      </div>

      <hr style={{
        width: "90%",
        margin: "25px auto",
        opacity: "0.8",
      }} />

      {/* Gallery */}

      <div className="gallery">
        {
          posts.map(post => {
            return (
              <img src={post.photo} className='item' onClick={() => { toggleDetails(post) }} />
            )
          })
        }
      </div>
      {
        show && <PostDetails item={onepost} toggleComment={toggleDetails} />
      }
      {
        changePic && <ProfilePic changeProfile={changeProfile} />
      }

    </div>
  )
}

export default Profile