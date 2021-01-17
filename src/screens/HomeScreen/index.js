import React, { useState } from "react";
import "./style.css";

import { AppInput, HomeInput, AppCard, Modal } from "../../components/index";

import prof from "../../Assets/Ellipse 2.png";
import user from "../../Assets/user_ico.png";
import mail from "../../Assets/email_ico.png";
import call from "../../Assets/call.png";
import gallery from "../../Assets/gallery.png";
import video from "../../Assets/video.png";

const HomeScreen = () => {
  const [isShow, setShow] = useState(false);

  const _handleModal = () => {
    if (!isShow) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  return (
    <div className="home-container">
      <div className="col-4">
        <div className="row">
          <div className="profile-card">
            <div className="inner-container">
              <div>
                <img src={prof} alt="pr" className="profile_pic"></img>
              </div>
              <p className="card-text">John Collins</p>
              <div className="form-container">
                <HomeInput
                  source={user}
                  disabled={true}
                  placeholder="name"
                  styleImg={{ width: "28px", height: "29px" }}
                />
                <HomeInput
                  source={mail}
                  disabled={true}
                  placeholder="email"
                  styleImg={{ width: "28px", height: "29px" }}
                />
                <HomeInput
                  source={call}
                  disabled={true}
                  placeholder="mobile"
                  styleImg={{ width: "28px", height: "29px" }}
                />
              </div>
              <button className="edit">edit</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="tabs">
            <div className="upper-sec">
              <p className="tab-title">Campaigns</p>
              <button className="tab-text-button">
                # your Campaigns ( 8 )
              </button>
              <button className="tab-text-button"># volunteers ( 8 )</button>
              <button className="tab-text-button"># voluntered ( 8 )</button>
            </div>
            <div className="lower-sec">
              <p className="tab-title">Advertisements</p>
              <button className="tab-text-button">
                # your advertisements ( 8 )
              </button>
              <button className="tab-text-button"># leads ( 8 )</button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-8">
        <div className="post-create-container">
          <div className="post-create-upper-sec">
            <img className="post-create-img" src={prof} alt="img" />
            <button
              className="post-create-modal-button"
              onClick={_handleModal}
              type="button"
            >
              post your cause
            </button>
          </div>
          <div className="post-create-lower-sec">
            <button className="post-create-media-button">
              <img src={gallery} className="post-create-media-img" alt="img" />
              <span className="post-create-label">photo</span>
            </button>
            <button className="post-create-media-button ">
              <img src={video} className="post-create-media-img " alt="img" />
              <span className="post-create-label">video</span>
            </button>
          </div>
        </div>
        <AppCard />
        <AppCard />
        <AppCard />
        <AppCard />
        {isShow ? (
          <Modal
            onClick={() => {
              setShow(false);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
export default HomeScreen;
