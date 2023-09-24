import React, { useState, useEffect, useRef } from 'react'

const ProfilePic = ({ changeProfile }) => {

    const [image,setImage] = useState("");
    const [url,setUrl] = useState("")


    const hiddenFileInput = useRef(null);
    const handleClick = () => {
        hiddenFileInput.current.click();
    }



    const postDetails = async () => {
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

    const postPic = async()=>{
        const res = await fetch('/uploadProfilePic', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    pic : url
                })
            })
            const data = await res.json();
            console.log(data);
            changeProfile();
            window.location.reload();
            // if(res.status === 200){
            //     toast.success("Post SuccessFully Posted");
            //     navigate("/");
            // }
            // else {
            //     toast.error(data.error);
            // }
    }

    useEffect(()=>{
        if(image){
            postDetails()
        }
    },[image])

    useEffect(()=>{
        if(url){
            postPic();
        }
    },[url])

    return (
        <div className='profilePic darkBg'>
            <div className="changePic centered">
                <div>
                    <h2>Change Profile Photo</h2>
                </div>
                <div style={{ borderTop: "1px solid #00000030" }}>
                    <button className='upload-btn' style={{ color: "#1EA1F7" }}
                        onClick={handleClick}
                    >Upload Photo</button>
                    <input type="file" ref={hiddenFileInput} accept='image/*' style={{ display: "none" }} onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div style={{ borderTop: "1px solid #00000030" }}>
                    <button className='upload-btn' style={{ color: "#Ed4956" }}
                     onClick={()=>{
                        setUrl(null);
                        postPic();
                     }}
                     >Remove Current photo</button>
                </div>
                <div style={{ borderTop: "1px solid #00000030" }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "15px" }} onClick={changeProfile}>cancel</button>
                </div>

            </div>
        </div>
    )
}

export default ProfilePic