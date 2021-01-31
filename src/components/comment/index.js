import React from "react";
import "./style.css";
import prof from "../../Assets/Ellipse 2.png";

const Comment = ({ src, name, time, desc }) => {
  return (
    <div className="mb-4">
      <div className="posts-header">
        <div className="post-header-image-container">
          <img src={src} alt="pr" className="post-header-image"></img>
        </div>
        <div className="post-header-name-container">
          <span className="post-header-title">{name}</span>
          <span className="post-header-subtitle">{time}</span>
        </div>
      </div>
      <div className="card-text">{desc}</div>
      <hr />
    </div>
  );
};

export default Comment;
