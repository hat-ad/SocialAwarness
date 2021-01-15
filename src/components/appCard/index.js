import React from "react";
import "./style.css";
import prof from "../../Assets/Ellipse 2.png";
import postImg from "../../Assets/scene.png";
import appreciate_ico from "../../Assets/clap.png";
import comment_ico from "../../Assets/comment.png";
import volunteer_ico from "../../Assets/volunteer.png";

const AppCard = () => {
  return (
    <div className="posts-card-container">
      <div className="posts-header">
        <div className="post-header-image-container">
          <img src={prof} alt="pr" className="post-header-image"></img>
        </div>
        <div className="post-header-name-container">
          <span className="post-header-title">John Collins</span>
          <span className="post-header-subtitle">jan 7 at 19:57</span>
        </div>
      </div>
      <div className="posts-body">
        <div className="post-body-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl
          eros...<span>read more</span>
        </div>
        <div className="post-body-image-container">
          <img src={postImg} alt="pr" className="post-body-image"></img>
        </div>
      </div>
      <hr />
      <div className="posts-footer">
        <div className="appreciate">
          <button className="appreciate-button">
            <img src={appreciate_ico} alt="ico" />
            <span>appreciate</span>
          </button>
        </div>
        <div className="comment">
          <button className="appreciate-button">
            <img src={comment_ico} alt="ico" />
            <span>comment</span>
          </button>
        </div>
        <div className="volunteer">
          <button className="appreciate-button">
            <img src={volunteer_ico} alt="ico" />
            <span>volunteer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppCard;
