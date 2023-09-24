import React, { useContext, useEffect, useState } from 'react'
import { useNavigate ,NavLink} from 'react-router-dom';
import { toast } from 'react-toastify'

import { LoginContext } from '../../contexts/loginContext';

// import './Home.css';

const MyFollowingPost = () => {
  const [data, setData] = useState([]);
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);
  const [item, setItems] = useState([]);

  const { userLogin } = useContext(LoginContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogin) {
      navigate('/signup');
    }
    const DataFetching = async () => {
      const datafetch = await fetch("/myfollowingpost", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      })
      const result = await datafetch.json();
      setData(result);
      console.log("myfollowingpost",result);
    }
    DataFetching()
  }, [userLogin, data])

  const toggleComment = (post) => {
    setShow(prev => !prev);
    setItems(post);
  }

  const LikePost = async (postId) => {
    const res = await fetch("/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ postId })
    })
    const likeRes = await res.json();
    const newData = data.map((posts) => {
      if (posts._id = likeRes._id) {
        return likeRes;
      } else {
        return posts;
      }
    })
    setData(newData);
    console.log("likeRes", likeRes);
  }

  const UnLikePost = async (postId) => {
    const res = await fetch("/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ postId })
    })
    const unlikeRes = await res.json();
    const newData = data.map((posts) => {
      if (posts._id = unlikeRes._id) {
        return unlikeRes;
      } else {
        return posts;
      }
    })
    setData(newData);
    console.log("likeRes", unlikeRes);
  }
  //for comment 
  const makeComment = async (postId) => {
    const res = await fetch("/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ comment, postId })
    })
    const commentData = await res.json();
    const newData = data.map((posts) => {
      if (posts._id = commentData._id) {
        return commentData;
      } else {
        return posts;
      }
    })
    setData(newData);
    setComment("");
    // console.log("makeComment", commentData);
    toast.success("comment Posted");
  }

  return (
    <div className='home'>
      {/* card */}
      {
        data.map((post) => {
          return (
            <div className="card">
              {/* card Header */}
              <div className="card-header">
                <div className="card-pic">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" />
                </div>
                <h5><NavLink to={`/profile/${post.postedBy._id}`}>
                  {post.postedBy.name}
                </NavLink></h5>
              </div>

              {/* card image */}
              <div className="card-image">
                <img src={post.photo} alt="" />
              </div>

              {/* card content */}
              <div className="card-content">
                {
                  post.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                    ?
                    <span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => UnLikePost(post._id)}>
                      favorite
                    </span>
                    :

                    <span className="material-symbols-outlined" onClick={() => LikePost(post._id)}>
                      favorite
                    </span>
                }


                <p>{post.likes.length} Like</p>
                <p>{post.body}</p>
                <p style={{ fontSize: "bolder", cursor: "pointer" }} onClick={() => toggleComment(post)}>View all Comments</p>
              </div>

              {/* add comment */}
              <div className="add-comment">
                <span className="material-symbols-outlined">
                  mood
                </span>
                <input type="text" placeholder='Add a comment' onChange={(e) => setComment(e.target.value)} value={comment} />
                <button className='comment' onClick={() => makeComment(post._id)}>Post</button>
              </div>

            </div>
          )
        })
      }

      {/* show Comments */}
      {
        show &&
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="" />
            </div>
            <div className="details" style={{ borderBottom: "1px solid #00000029" }}>
              <div className="card-header">
                <div className="card-pic">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" />
                </div>
                <h5>{item.postedBy.name}</h5>
              </div>

              <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>

                {
                  item.comments.map((comment) => {
                    // console.log("comment",comment);
                    return (
                      <p className='comm'>
                        <span className='commenter' style={{ fontWeight: "bolder" }}>{comment.postedBy.name} </span>
                        <span className='commentText'>{comment.comment}</span>
                      </p>
                    )
                  })
                }
              </div>

              <div className="card-content">
                <p>{item.likes.length} Like</p>
                <p>{item.body}</p>
              </div>

              <div className="add-comment">
                <span className="material-symbols-outlined">
                  mood
                </span>
                <input type="text" placeholder='Add a comment' onChange={(e) => setComment(e.target.value)} value={comment} />
                <button className='comment'
                  onClick={() => {
                    makeComment(item._id)
                    toggleComment();
                  }}
                >
                  Post</button>
              </div>

            </div>
          </div>

          <div
            className="close-comment"
          >
            <span className="material-symbols-outlined material-symbols-outlined-comment" onClick={toggleComment}>
              close
            </span>
          </div>

        </div>
      }

    </div>

  )
}

export default MyFollowingPost