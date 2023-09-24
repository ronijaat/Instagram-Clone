import React, { useState, useEffect } from 'react'
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import './CreatePost.css';

const CreatePost = () => {
    const navigate = useNavigate();

    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    //posting image to cloudinary

    useEffect(() => {
        //saving post to mongodb
        const postDb = async () => {
            const res = await fetch('/createpost', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    body,
                    photo: url
                })
            })
            const data = await res.json();
            if(res.status === 200){
                toast.success("Post SuccessFully Posted");
                navigate("/");
            }
            else {
                toast.error(data.error);
            }
            // console.log(data)
        }
        if(url){
            postDb();
        }
    }, [url]);

    const postDetails = async () => {
        console.log(body, image);
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "ronijaat");

        const res = await fetch("https://api.cloudinary.com/v1_1/ronijaat/image/upload", {
            method: "POST",
            body: data
        })
        const urlCLoud = await res.json();
        // console.log("urlCLoud",urlCLoud.url);
        setUrl(urlCLoud.url);
    }

    const loadFile = (event) => {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory
        }
    }

    return (
        <div className='create-post'>
            <div className="post-header">
                <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
                <button id="post-btn" onClick={postDetails}>Share</button>
            </div>

            <div className="main-div">
                <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png" alt="" id="output" />
                <input type="file" accept='image/*' onChange={(event) => {
                    loadFile(event)
                    setImage(event.target.files[0]);
                }} />
            </div>

            <div className="details">
                <div className="card-header">
                    <div className="card-pic">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" i />
                    </div>
                    <h5>Ramesh</h5>
                </div>
                <textarea type="text" placeholder='Write a caption!!!' value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            </div>

        </div>
    )
}

export default CreatePost