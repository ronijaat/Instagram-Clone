import React from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import './PostDetails.css'

const PostDetails = ({ item, toggleComment }) => {

  const navigate = useNavigate();

  const removePost = async (postId) => {
    if (window.confirm("Do you really want to delete the post ?")) {
      const res = await fetch(`/deletePost/${postId}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      })

      const delPost = await res.json();
      // console.log("delPost", delPost);
      if(res.status === 200){
        toast.success('Post deleted Successfully')
        navigate('/')
      }else{
        toast.error(res.error);
        navigate('/')
      }
      
    }

  }

  return (
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
            <div className="deletePost">
              <span class="material-symbols-outlined" onClick={() => removePost(item._id)}>
                delete
              </span>
            </div>

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
            <input type="text" placeholder='Add a comment'
            // onChange={(e) => setComment(e.target.value)} 
            // value={comment} 
            />
            <button className='comment'
              onClick={() => {
                // makeComment(item._id)
                // toggleComment();
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
  )
}

export default PostDetails