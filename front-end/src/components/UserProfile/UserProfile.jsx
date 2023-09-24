import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import './UserProfile.css'

const UserProfile = () => {
    var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    const { userid } = useParams();

    const [isFollow, setIsFollow] = useState(false);

    const [user, setUser] = useState("");
    const [posts, setPosts] = useState([]);

    const followUser = async (userId) => {
        const res = await fetch(`/follow`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({ followId: userId })
        })
        const data = await res.json();
        setIsFollow(true);
    }

    const unfollowUser = async (userId) => {
        const res = await fetch(`/unfollow`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({ followId: userId })
        })
        const data = await res.json();
        setIsFollow(false);
    }

    useEffect(() => {
        const posData = async () => {
            const res = await fetch(`/user/${userid}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt")
                }
            })
            const data = await res.json();
            setUser(data.user);
            setPosts(data.post);
            console.log(data);
            if (data.user.followers.filter(filteredId =>filteredId == JSON.parse(localStorage.getItem("user"))._id).length > 0) {
                setIsFollow(true);
                console.log("isFollow", isFollow)
            }
            // console.log("isFollow", isFollow)
        }
        posData();
    }, [userid, isFollow])

    return (
        <div className='profile'>
            {/* Profile Frame  */}
            <div className="profile-frame">
                <div className="profile-pic">
                    <img src={user.Photo? user.Photo : picLink} alt="" />
                </div>

                <div className="profile-data">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                        <h1>{user.name}</h1>
                        {
                            isFollow ?
                                <button className='followBtn' onClick={() => unfollowUser(user._id)}>UnFollow</button>
                                :

                                <button className='followBtn' onClick={() => followUser(user._id)}>Follow</button>
                        }
                    </div>
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
                    posts?.map(post => {
                        return (
                            <img src={post.photo} className='item'
                            //   onClick={()=>{toggleDetails(post)}}
                            />
                        )
                    })
                }
            </div>
            {/* {
        show && <PostDetails item={posts} toggleComment={toggleDetails}/>
      } */}

        </div>
    )
}

export default UserProfile