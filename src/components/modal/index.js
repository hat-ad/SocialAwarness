import React, { useState } from "react";
import "./style.css";

import gallery from "../../Assets/gallery.png";
import video from "../../Assets/video.png";
import API from "../../API/service/api";

const Modal = ({ onClick, currentTime, getPost }) => {
  const [isAd, setisAd] = useState(false);
  const [imgName, setImageName] = useState("");
  const [videoName, setVideoName] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [currentTime, setCurrentTime] = useState("");

  const _handleSwitch = () => {
    if (!isAd) setisAd(true);
    else setisAd(false);
  };

  const _handleFileSelectImg = (e) => {
    console.log(e.target.files[0].name);
    setImageName(e.target.files[0]);
  };

  const _handleFileSelectVideo = (e) => {
    console.log(e.target.files[0].name);
    setVideoName(e.target.files[0].name);
  };

  const getImageDBURI = () => {
    return new Promise((resolve, reject) => {
      let data = new FormData();
      data.append("file", imgName);
      data.append("upload_preset", "social-awareness");
      data.append("cloud_name", "ds7xxwtvb");
      fetch("https://api.cloudinary.com/v1_1/ds7xxwtvb/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  };

  const _handleSubmit = async () => {
    if (title === "") {
      alert("Please add a title.");
    } else if (description === "") {
      alert("Please add a description.");
    } else if (imgName === "") {
      alert("Please add a Image.");
    } else {
      let imgURL = await getImageDBURI();
      let formdata = new FormData();
      console.log(imgURL);
      formdata.append("title", title);
      formdata.append("content", description);
      formdata.append("media", imgURL.url);
      formdata.append("mediaType", imgURL.format);
      for (let pair of formdata.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      await API.postForm(isAd ? "ad" : "cause", formdata);

      onClick();
      getPost();
      alert("your post has been created");
    }
  };

  const _validation = () => {
    if (title === "" && description === "" && imgName === "") {
      alert(`please fill all the fields and upload an image to proceed`);
    } else {
      _handleSubmit();
    }
  };
  // getCurrentTime();

  return (
    <div className="modal-container">
      <div className="modal-main">
        <div className="modal-head-sec">
          <span className="modal-head-title">
            {isAd ? "Create Ad" : "Create Cause"}
          </span>
          <span className="close" onClick={onClick}>
            &times;
          </span>
        </div>
        <hr />
        <div className="modal-mid-sec">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="posts-header">
              <div className="post-header-image-container">
                <img
                  src={localStorage.getItem("profile_Img")}
                  alt="pr"
                  className="post-header-image"
                  style={{ width: "81px", height: "69px" }}
                ></img>
              </div>
              <div className="post-header-name-container">
                <span className="post-header-title">
                  {localStorage.getItem("name")}
                </span>
                <span className="post-header-subtitle">{currentTime}</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span className="switch-label">Create Ad: </span>

              <label className="switch">
                <input type="checkbox" onClick={_handleSwitch} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="modal-text-input-container">
            <div className="modal-input-title">
              <input
                className="modal-title-main"
                placeholder="Enter title"
                onInput={(e) => {
                  setTitle(e.target.value);
                }}
                required={true}
              />
            </div>
            <br />
            <div className="modal-input-cause">
              <textarea
                className="modal-cause-main"
                placeholder={
                  isAd ? "Enter your Ad description" : "Enter Your Cause"
                }
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
              ></textarea>
            </div>
          </div>
          <hr />
        </div>
        <div className="modal-footer-sec">
          <div
            className="post-create-lower-sec"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <span className="modal-media-label">
              {isAd ? "Addto your Advertisement: " : "Add to your Cause: "}
            </span>
            <div className="post-create-media-button">
              <input
                type="file"
                style={{ position: "absolute", width: "10%", opacity: "0" }}
                onChange={_handleFileSelectImg}
                accept={"image/x-png,image/jpeg,image/jpg"}
              />
              <img src={gallery} className="post-create-media-img" alt="img" />
              <span className="post-create-label " style={{ fontSize: "20px" }}>
                {imgName === "" ? "Photo" : imgName.name}
              </span>
            </div>
            {/* <button className="post-create-media-button ">
              <input
                type="file"
                style={{ position: "absolute", width: "10%", opacity: "0" }}
                onChange={_handleFileSelectVideo}
              />
              <img src={video} className="post-create-media-img " alt="img" />
              <span className="post-create-label " style={{ fontSize: "20px" }}>
                {videoName === "" ? "video" : videoName}
              </span>
            </button> */}
          </div>

          <div className="modal-post-button-container">
            <button
              className="modal-post-button"
              onClick={() => {
                _validation();
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
