import React, { useState } from "react";
import "./style.css";

import { Comment, VolunteerModal } from "../../components/index";

import prof from "../../Assets/Ellipse 2.png";
import img from "../../Assets/scene2.png";
import appreciate_ico from "../../Assets/clap.png";
import comment_ico from "../../Assets/comment.png";
import volunteer_ico from "../../Assets/volunteer.png";
import plane from "../../Assets/plane.png";

const DetailsScreen = () => {
  const [appreciateName, setAppreciateName] = useState("");
  const [isShowVolunteerModal, setShowVolunteer] = useState(false);

  const _handleAppreciateClick = () => {
    setAppreciateName("you and 4 others appreciated");
  };

  const _handleVolunteerModal = () => {
    if (!isShowVolunteerModal) {
      setShowVolunteer(true);
    } else {
      setShowVolunteer(false);
    }
  };
  return (
    <>
      <div className="detail-container row justify-content-between">
        <div className="col-9 mb-5">
          <div className="container post-detail-container">
            <div className="detail-header">Title</div>
            <div className="posts-header">
              <div className="post-header-image-container">
                <img src={prof} alt="pr" className="post-header-image"></img>
              </div>
              <div className="post-header-name-container">
                <span className="post-header-title">John Collins</span>
                <span className="post-header-subtitle">jan 7 at 19:57</span>
              </div>
            </div>

            <div className="post-detail-section">
              <div className="post-detail-image-container">
                <img
                  className="card-img-top"
                  src={img}
                  alt="img"
                  height="400"
                />
              </div>
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                nisl eros, pulvinar facilisis justo mollis, auctor consequat
                urna. Morbi a bibendum metus. Donec scelerisque sollicitudin
                enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci
                vestibulum eget. Class aptent taciti sociosqu ad litora torquent
                per conubia nostra, per inceptos himenaeos. Duis pharetra luctus
                lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere
                ut, pulvinar vitae dolor. Integer eu nibh at nisi ullamcorper
                sagittis id vel leo. Integer feugiat faucibus libero, at maximus
                nisl suscipit posuere. Morbi nec enim nunc. Phasellus bibendum
                turpis ut ipsum egestas, sed sollicitudin elit convallis. Cras
                pharetra mi tristique sapien vestibulum lobortis. Nam eget
                bibendum metus, non dictum mauris. Nulla at tellus sagittis,
                viverra est a, bibendum metus.
              </p>
              <p className="card-text mt-3" style={{ color: "grey" }}>
                {appreciateName === "" ? "4 appreciated" : appreciateName}
              </p>
              <div className="posts-footer mr-4 ml-4">
                <div className="appreciate">
                  <button
                    className="appreciate-button"
                    onClick={_handleAppreciateClick}
                  >
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
          </div>
        </div>
        <div className="col-3">
          <div className="comment-container container pt-4 pb-5 pr-4 pl-4">
            <div className="comment-header">Comments (8)</div>
            <div className="input-comment mt-5 mb-5">
              <input className="comment-box" placeholder="comment" />
              <img src={plane} alt="img" className="plane-ico" />
            </div>
            <div className="old-comment-container mt-4">
              <Comment />
              <Comment />
              <Comment />
            </div>
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

export default DetailsScreen;
