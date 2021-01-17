import React from "react";
import "./style.css";
import prof from "../../Assets/Ellipse 2.png";

const Comment = () => {
  return (
    <div className="mb-4">
      <div className="posts-header">
        <div className="post-header-image-container">
          <img src={prof} alt="pr" className="post-header-image"></img>
        </div>
        <div className="post-header-name-container">
          <span className="post-header-title">John Collins</span>
          <span className="post-header-subtitle">jan 7 at 19:57</span>
        </div>
      </div>
      <div className="card-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl
        eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a
        bibendum metus. Donec scelerisque sollicitudin enim
      </div>
      <hr />
    </div>
  );
};

export default Comment;
