import React, { useState } from "react";
import "./style.css";
import appreciate_ico from "../../Assets/clap.png";
import comment_ico from "../../Assets/comment.png";
import volunteer_ico from "../../Assets/volunteer.png";

import { VolunteerModal } from "../../components/index";

import { Link } from "react-router-dom";

const AppCard = ({
  src,
  name,
  txtBody,
  srcBody,
  appreciateCount,
  onAppreciate,
  cause_id,
}) => {
  const [isShowVolunteerModal, setShowVolunteer] = useState(false);
  // const postId = id;
  const _handleVolunteerModal = () => {
    if (!isShowVolunteerModal) {
      setShowVolunteer(true);
    } else {
      setShowVolunteer(false);
    }
  };
  return (
    <>
      <div className="posts-card-container">
        <div className="posts-header">
          <div className="post-header-image-container">
            <img
              src={src}
              alt="pr"
              className="post-header-image"
              width={"81px"}
              height="69px"
            ></img>
          </div>
          <div className="post-header-name-container">
            <span className="post-header-title">{name}</span>
            <span className="post-header-subtitle">jan 7 at 19:57</span>
          </div>
        </div>
        <div className="posts-body">
          <div className="post-body-text mb-2">
            {txtBody}...<span>read more</span>
          </div>
          <div className="post-body-image-container">
            <img src={srcBody} alt="pr" className="post-body-image"></img>
          </div>
        </div>
        <p className="card-text mt-3" style={{ color: "grey" }}>
          {appreciateCount === "" ? "0 appreciated" : appreciateCount}
        </p>
        <hr />
        <div className="posts-footer">
          <div className="appreciate">
            <button className="appreciate-button" onClick={onAppreciate}>
              <img src={appreciate_ico} alt="ico" />
              <span>appreciate</span>
            </button>
          </div>
          <div className="comment">
            <Link to={"/details/" + cause_id} className="appreciate-button">
              <img src={comment_ico} alt="ico" />
              <span>comment</span>
            </Link>
          </div>
          <div className="volunteer">
            <button
              className="appreciate-button"
              onClick={_handleVolunteerModal}
            >
              <img src={volunteer_ico} alt="ico" />
              <span>volunteer</span>
            </button>
          </div>
        </div>
      </div>

      {isShowVolunteerModal ? (
        <VolunteerModal
          onClick={() => {
            setShowVolunteer(false);
          }}
        />
      ) : null}
    </>
  );
};

export default AppCard;
