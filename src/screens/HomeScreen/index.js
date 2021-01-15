import React from "react";
import "./style.css";

import { AppInput, HomeInput, AppCard } from "../../components/index";

import prof from "../../Assets/Ellipse 2.png";
import user from "../../Assets/user_ico.png";
import mail from "../../Assets/email_ico.png";
import call from "../../Assets/call.png";

const HomeScreen = () => {
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
        <AppCard />
        <AppCard />
        <AppCard />
        <AppCard />
      </div>
    </div>
  );
};
export default HomeScreen;
