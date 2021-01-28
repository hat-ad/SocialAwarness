import React, { useState, useEffect } from "react";
import "./style.css";

import { HomeInput, AppCard, Modal } from "../../components/index";

import prof from "../../Assets/Ellipse 2.png";
import user from "../../Assets/user_ico.png";
import mail from "../../Assets/email_ico.png";
import call from "../../Assets/call.png";
import gallery from "../../Assets/gallery.png";
import video from "../../Assets/video.png";

import API from "../../API/service/api";

const HomeScreen = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [cause, setCause] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [appreciateName, setAppreciateStatus] = useState(false);
  const [userCauseCount, setUserCauseCount] = useState(0);

  //input fields
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [contact, setContact] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    console.log(localStorage.getItem("userID"));
    getUser(localStorage.getItem("userID"));
    _handleUserCampaigns();
    getPost();
  }, []);

  const getCurrentTime = () => {
    const date = new Date();
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    // let weekdays = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
    return `${
      months[date.getMonth()]
    } ${date.getDate()} at ${date.getHours()}:${date.getMinutes()}`;
  };
  const getUser = async (id) => {
    const response = await API.get("user/" + id);
    setUserDetails(response);
    localStorage.setItem("profile_Img", response.img);
    localStorage.setItem("name", response.name);

    console.log("user is", response);
  };

  const getPost = async () => {
    const response = await API.get("cause");
    // console.log(response.cause[0]);
    if (response.status === "OK") {
      setCause(response.cause);
    }
  };
  const _handleAppreciateClick = async (id) => {
    cause.forEach(async (obj) => {
      if (obj._id === id) {
        console.log();
        const response = await API.post(
          "appreciate/" + id,
          obj.appreciateBy.concat([
            {
              name: userDetails.name,
            },
          ])
        );
        setAppreciateStatus(true);
      }
    });
  };

  const _handleUserCampaigns = async () => {
    const response = await API.get(
      `cause?id=${localStorage.getItem("userID")}&user=1`
    );
    setUserCauseCount(response.cause.length);
    if (response.status === "OK") {
      setCause(response.cause);
    }
  };
  const _handleModal = () => {
    if (!isShowModal) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const _handleEdit = async () => {
    if (!edit) setEdit(true);
    else {
      setEdit(false);

      let formdata = new FormData();
      formdata.append("username", username || userDetails.username);
      formdata.append("ph_no", parseInt(contact || userDetails.contact));
      formdata.append("email", email || userDetails.email);
      formdata.append("name", name || userDetails.name);
      const response = await API.upload(
        `user/${localStorage.getItem("userID")}?profImg=0`,
        formdata
      );
      console.log(response);
    }
  };

  return (
    <div className="home-container">
      <div className="col-4">
        <div className="row">
          <div className="profile-card">
            <div className="inner-container">
              <div style={{}}>
                <img
                  src={userDetails.img}
                  alt="pr"
                  className="profile_pic"
                  height={110}
                  width={120}
                ></img>
              </div>

              {/* <p className="card-text">{userDetails.username}</p> */}
              <div className="form-container">
                <HomeInput
                  disabled={!edit}
                  placeholder="username"
                  styleImg={{ width: "28px", height: "29px", display: "none" }}
                  styleInput={{ textAlign: "center" }}
                  value={!edit ? "" : userDetails.username}
                  onInputText={(e) => setUsername(e.target.value)}
                />
                <HomeInput
                  source={user}
                  disabled={!edit}
                  placeholder="name"
                  styleImg={{ width: "28px", height: "29px" }}
                  value={userDetails.name}
                  onInputText={(e) => setName(e.target.value)}
                />
                <HomeInput
                  source={mail}
                  disabled={!edit}
                  placeholder="email"
                  styleImg={{ width: "28px", height: "29px" }}
                  value={userDetails.email}
                  onInputText={(e) => setEmail(e.target.value)}
                />
                <HomeInput
                  source={call}
                  disabled={!edit}
                  placeholder="mobile"
                  styleImg={{ width: "28px", height: "29px" }}
                  value={userDetails.contact}
                  onInputText={(e) => setContact(e.target.value)}
                />
              </div>
              <button className="edit" onClick={_handleEdit}>
                {edit ? "submit" : "edit"}
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="tabs">
            <div className="upper-sec">
              <p className="tab-title">Campaigns</p>
              <button
                className="tab-text-button"
                onClick={_handleUserCampaigns}
              >
                # your Campaigns ( {userCauseCount} )
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
            <img className="post-create-img" src={userDetails.img} alt="img" />
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
        {cause.map((obj) => {
          return (
            <AppCard
              name={obj.createdBy.split("Image")[0]}
              // src={`data:${obj.mediaType};base64,${
              //   obj.createdBy.split(",")[1]
              // }`}
              src={obj.createdBy.split("Image")[1]}
              txtBody={obj.content}
              srcBody={`data:${obj.mediaType};base64,${obj.media}`}
              // srcBody={obj.media}
              onAppreciate={() => {
                _handleAppreciateClick(obj._id);
              }}
              appreciateCount={
                (appreciateName
                  ? obj.appreciateBy.length + 1
                  : obj.appreciateBy.length) + " appreciated"
              }
              key={obj._id}
              cause_id={obj._id}
            />
          );
        })}
      </div>
      {isShowModal ? (
        <Modal
          onClick={() => {
            setShowModal(false);
          }}
          currentTime={getCurrentTime()}
        />
      ) : null}
    </div>
  );
};
export default HomeScreen;
