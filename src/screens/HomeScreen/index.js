import React, { useState, useEffect, useContext } from "react";
import "./style.css";

import { HomeInput, AppCard, Modal } from "../../components/index";

import user from "../../Assets/user_ico.png";
import mail from "../../Assets/email_ico.png";
import call from "../../Assets/call.png";
import gallery from "../../Assets/gallery.png";
import video from "../../Assets/video.png";

import { AuthContext } from "../../API/context/index";

import API from "../../API/service/api";
import { Link, useHistory } from "react-router-dom";

const HomeScreen = () => {
  const { token, setToken } = useContext(AuthContext);
  const history = useHistory();
  const [isShowModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [cause, setCause] = useState([]);
  const [ad, setAd] = useState([]);
  const [post, setPost] = useState([]);

  const [profileImg, setProfileImg] = useState("");
  const [editImg, setEditImg] = useState(0);
  const [editProfileImg, setEditProfileImg] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [appreciateStatus, setAppreciateStatus] = useState(false);
  const [interestStatus, setInterestStatus] = useState(false);

  const [userCauseCount, setUserCauseCount] = useState(0);
  const [userADCount, setUserADCount] = useState(0);

  const [volunteers, setVolunteers] = useState({});
  const [leads, setLeads] = useState({});

  const [volunteersTab, showVolunteersTab] = useState(false);
  const [volunteersLength, setVolunteersLength] = useState(0);
  const [volunteeredLength, setvolunteeredLength] = useState(0);

  const [leadsTab, showLeadsTab] = useState(false);
  const [leadsLength, setLeadsLength] = useState(0);
  const [postsTab, showPostsTab] = useState(false);

  const [fileInputRef, setFileInputRef] = useState({});

  //input fields
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    console.log(localStorage.getItem("userID"));
    getUser(localStorage.getItem("userID"));
    _handleUserCampaigns();
    _handleUserAd();
    getPost();
    showVolunteersTab(false);
    showLeadsTab(false);
    showPostsTab(true);

    getVolunteer(localStorage.getItem("userID"), 1, true);
    getVolunteered(localStorage.getItem("userID"), 0, true);
    getLead(localStorage.getItem("userID"), true);
    // eslint-disable-next-line
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
    return `${
      months[date.getMonth()]
    } ${date.getDate()} at ${date.getHours()}:${date.getMinutes()}`;
  };
  const getUser = async (id) => {
    const response = await API.get("user/" + id);
    setUserDetails(response);
    localStorage.setItem("profile_Img", response.img);
    localStorage.setItem("name", response.name);
    setName(response.name);
    setEmail(response.email);
    console.log("phone no: ", response.contact);
    setContact(response.contact);
    setUsername(response.username);
    setProfileImg(response.img);
    setEditProfileImg(response.img);
    console.log("user is", response);
  };
  const getVolunteer = async (id, post, first) => {
    const response = await API.get(`volunteer?id=${id}&post=${post}`);
    setVolunteersLength(response.volunteer.length);
    setVolunteers(response);

    if (volunteers !== {} && !first) {
      showVolunteersTab(true);
      showLeadsTab(false);
    }
  };

  const getVolunteered = async (id, post, first) => {
    const response = await API.get(`volunteer?id=${id}&post=${post}`);
    setvolunteeredLength(response.volunteer.length);
    setVolunteers(response);

    if (volunteers !== {} && !first) {
      showVolunteersTab(true);
      showLeadsTab(false);
    }
  };
  const getLead = async (id, first) => {
    const response = await API.get(`lead?id=${id}`);
    setLeadsLength(response.lead.length);
    setLeads(response);
    // showPostsTab(!postsTab);

    if (leads !== {} && !first) {
      showVolunteersTab(false);
      showPostsTab(false);
      showLeadsTab(true);
    }
  };
  const getPost = async () => {
    const causeList = await API.get("cause");
    const adList = await API.get("ad");
    if (causeList.status === "OK") {
      setCause(causeList.cause);
    }
    if (adList.status === "OK") {
      setAd(adList.AD);
    }
    // setUserADCount(adList.AD.length);

    showLeadsTab(false);
    showVolunteersTab(false);
    showPostsTab(true);
    setPost([...causeList.cause, ...adList.AD]);

    // shuffling the array
    // for (let i = post.length - 1; i > 0; i--) {
    //   let j = Math.floor(Math.random() * (i + 1));
    //   let temp = post[i];
    //   post[i] = post[j];
    //   post[j] = temp;
    // }

    // console.log("mixPosts : ", post);
  };

  const _handleAppreciateClick = async (id, isAd) => {
    console.log("ad ", isAd);
    if (isAd) {
      ad.forEach(async (obj) => {
        if (obj._id === id) {
          await API.post(
            "interest/" + id,
            obj.interest_count.concat([
              {
                name: userDetails.name,
              },
            ])
          );
          setInterestStatus(true);
        }
      });
    }
    cause.forEach(async (obj) => {
      if (obj._id === id) {
        await API.post(
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
    showLeadsTab(false);
    if (!leadsTab || !volunteersTab) {
      showPostsTab(true);
    }
    if (response.status === "OK") {
      setPost(response.cause);
    }
    showVolunteersTab(false);
  };

  const _handleUserAd = async () => {
    const response = await API.get(
      `ad?id=${localStorage.getItem("userID")}&user=1`
    );
    console.log("response: ", response);
    setUserADCount(response.AD.length);
    showLeadsTab(false);

    if (response.status === "OK") {
      setPost(response.AD);
    }
    showVolunteersTab(false);
  };
  const _handleModal = () => {
    if (!isShowModal) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const getImageDBURI = () => {
    return new Promise((resolve, reject) => {
      let data = new FormData();
      data.append("file", profileImg);
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

  const _handleEdit = async () => {
    if (!edit) setEdit(true);
    else {
      setEdit(false);

      const formData = {
        profile_img: profileImg,
        username: username,
        ph_no: contact,
        // email: email,
        name: name,
      };

      let imgURL = {};
      if (profileImg !== "") {
        imgURL = await getImageDBURI();
        console.log(imgURL.url);
        formData.profile_img = imgURL.url;
      }

      console.log("userDetails: ", userDetails);
      console.log("formData: ", formData);

      const response = await API.update(
        `user/${localStorage.getItem("userID")}`,
        formData
      );
      getUser(localStorage.getItem("userID"));
    }
  };

  const PostSection = () => {
    if (volunteersTab) {
      return (
        <>
          <h1>Volunteers</h1>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">location</th>
                <th scope="col">contact</th>
                <th scope="col">volunteered on post</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.volunteer.map((ob, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{ob.name}</td>
                    <td>{ob.location}</td>
                    <td>{ob.ph_no}</td>
                    <td>{ob.post.title}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      );
    }
    if (leadsTab) {
      return (
        <>
          <h1>Leads</h1>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>

                <th scope="col">contact</th>
                <th scope="col">Lead on Advertisement</th>
              </tr>
            </thead>
            <tbody>
              {leads.lead.map((ob, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{ob.name}</td>
                    <td>{ob.ph_no}</td>
                    <td>{ob.post.title}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      );
    }
    if (postsTab) {
      return (
        <>
          {post.map((obj) => {
            return (
              <AppCard
                name={obj.createdBy.name}
                src={obj.createdBy.profile_img}
                txtBody={obj.content}
                srcBody={obj.media}
                // srcBody={obj.media}
                time={obj.dateCreated}
                onAppreciate={() => {
                  _handleAppreciateClick(obj._id, obj.isAd);
                }}
                appreciateCount={
                  obj.isAd
                    ? (interestStatus
                        ? obj.interest_count.length + 1
                        : obj.interest_count.length) + " interested"
                    : (appreciateStatus
                        ? obj.appreciateBy.length + 1
                        : obj.appreciateBy.length) + " appreciated"
                }
                key={obj._id}
                cause_id={obj._id}
                isAd={obj.isAd}
                postCreatorId={obj.createdBy._id}
              />
            );
          })}
        </>
      );
    } else {
      return <></>;
    }
  };
  return (
    <div className="home-container">
      <div className="col-4">
        <div className="row">
          <div className="profile-card">
            <div className="inner-container">
              <div className="user-detail-img-container">
                <input
                  type="file"
                  style={{
                    position: "absolute",
                    top: "1%",
                    display: "none",
                  }}
                  className="inp"
                  onChange={(e) => {
                    setEditImg(1);
                    setProfileImg(e.target.files[0]);
                    setEditProfileImg(URL.createObjectURL(e.target.files[0]));
                  }}
                  accept={"image/x-png,image/jpeg,image/jpg"}
                  disabled={!edit}
                  ref={(fileInput) => setFileInputRef(fileInput)}
                />
                <img
                  src={editProfileImg}
                  alt="pr"
                  className="profile_pic"
                  height={110}
                  width={120}
                  onClick={() => fileInputRef.click()}
                  onMouseOver={(e) => {
                    if (edit) {
                      e.target.style.opacity = 0.5;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = 1;
                  }}
                ></img>
              </div>

              {/* <p className="card-text">{userDetails.username}</p> */}
              <div className="form-container">
                <HomeInput
                  disabled={!edit}
                  placeholder="username"
                  styleImg={{ width: "28px", height: "29px", display: "none" }}
                  styleInput={{ textAlign: "center" }}
                  value={userDetails.username || ""}
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
                {/* <HomeInput
                  source={mail}
                  disabled={!edit}
                  placeholder="email"
                  styleImg={{ width: "28px", height: "29px" }}
                  value={userDetails.email}
                  onInputText={(e) => setEmail(e.target.value)}
                /> */}
                <HomeInput
                  source={call}
                  disabled={!edit}
                  placeholder="mobile"
                  styleImg={{ width: "28px", height: "29px" }}
                  value={userDetails.contact}
                  onInputText={(e) => setContact(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className="edit" onClick={() => _handleEdit()}>
                  {edit ? "submit" : "edit"}
                </button>
                <Link
                  className="edit appreciate-button"
                  style={{ marginLeft: 10, textAlign: "center" }}
                  to="/"
                  onClick={() => {
                    setToken(null);
                    history.push("/");
                    localStorage.removeItem("userID");
                    localStorage.removeItem("token");
                    localStorage.removeItem("name");
                    localStorage.removeItem("profile_Img");
                  }}
                >
                  {"logout"}
                </Link>
              </div>
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
              <button
                className="tab-text-button"
                onClick={() => {
                  getVolunteer(localStorage.getItem("userID"), 1, false);
                }}
              >
                # volunteers ( {volunteersLength} )
              </button>
              <button
                className="tab-text-button"
                onClick={() =>
                  getVolunteered(localStorage.getItem("userID"), 0, false)
                }
              >
                # voluntered ( {volunteeredLength} )
              </button>
            </div>
            <div className="lower-sec">
              <p className="tab-title">Advertisements</p>
              <button className="tab-text-button" onClick={_handleUserAd}>
                # your advertisements ( {userADCount} )
              </button>
              <button
                className="tab-text-button"
                onClick={() => getLead(localStorage.getItem("userID"), false)}
              >
                # leads ( {leadsLength} )
              </button>
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
            <button
              className="post-create-media-button"
              onClick={() => setShowModal(true)}
            >
              <img src={gallery} className="post-create-media-img" alt="img" />
              <span className="post-create-label">photo</span>
            </button>
            {/* <button
              className="post-create-media-button "
              onClick={() => setShowModal(true)}
            >
              <img src={video} className="post-create-media-img " alt="img" />
              <span className="post-create-label">video</span>
            </button> */}
          </div>
        </div>

        <>
          <PostSection />
        </>
      </div>
      {isShowModal ? (
        <Modal
          onClick={() => {
            setShowModal(false);
          }}
          currentTime={getCurrentTime()}
          getPost={getPost}
        />
      ) : null}
    </div>
  );
};
export default HomeScreen;
