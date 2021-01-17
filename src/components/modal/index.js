import React from "react";
import "./style.css";
import prof from "../../Assets/Ellipse 2.png";
import gallery from "../../Assets/gallery.png";
import video from "../../Assets/video.png";

const Modal = ({ onClick }) => {
  return (
    <div className="modal-container">
      <div className="modal-main">
        <div className="modal-head-sec">
          <span className="modal-head-title">Create Cause</span>
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
                  src={prof}
                  alt="pr"
                  className="post-header-image"
                  style={{ width: "81px", height: "69px" }}
                ></img>
              </div>
              <div className="post-header-name-container">
                <span className="post-header-title">John Collins</span>
                <span className="post-header-subtitle">jan 7 at 19:57</span>
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
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="modal-text-input-container">
            <div className="modal-input-title">
              <input className="modal-title-main" placeholder="Enter title" />
            </div>
            <br />
            <div className="modal-input-cause">
              <textarea
                className="modal-cause-main"
                placeholder="Enter Your Cause"
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
            <span className="modal-media-label"> Add to your Cause: </span>
            <button className="post-create-media-button">
              <img src={gallery} className="post-create-media-img" alt="img" />
              <span className="post-create-label " style={{ fontSize: "20px" }}>
                photo
              </span>
            </button>
            <button className="post-create-media-button ">
              <img src={video} className="post-create-media-img " alt="img" />
              <span className="post-create-label " style={{ fontSize: "20px" }}>
                video
              </span>
            </button>
          </div>
          <div className="modal-post-button-container">
            <button className="modal-post-button">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
