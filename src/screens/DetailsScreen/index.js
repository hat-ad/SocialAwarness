import React, { useState, useEffect } from "react";
import "./style.css";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Comment, Modal, VolunteerModal } from "../../components/index";

import appreciate_ico from "../../Assets/clap.png";
import comment_ico from "../../Assets/comment.png";
import volunteer_ico from "../../Assets/volunteer.png";
import plane from "../../Assets/plane.png";
import heart from "../../Assets/heart.png";
import operator from "../../Assets/operator.png";
import back from "../../Assets/left-arrow.png";

import API from "../../API/service/api";
const DetailsScreen = () => {
  const history = useHistory();
  const [appreciateName, setAppreciateName] = useState();
  const [isShowVolunteerModal, setShowVolunteer] = useState(false);
  const [comments, setComments] = useState([]);
  const [postDetails, setPostDetails] = useState([]);
  const [name, setName] = useState("");
  const [profImg, setProfImg] = useState("");

  const [inComment, setInComment] = useState("");
  const { cause_id, isAD } = useParams();

  useEffect(() => {
    _getPostDetails();
    _getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cause_id]);

  const _getComments = async () => {
    const response = await API.get("comment/" + cause_id);
    console.log(response);
    if (response.status === "OK") {
      setComments(response.comment);
    }
  };

  const _createComments = async () => {
    if (inComment === "") {
      alert("please enter a comment");
    } else {
      let data = {
        desc: inComment,
        post_con: cause_id,
      };
      console.log(data);
      const response = await API.post("comment/", data);
      console.log(response);
      if (response.status === "Comment Created") {
        _getComments();
      }
      setInComment("");
    }
  };

  const _getPostDetails = async () => {
    // const response = await API.get(`cause?id=${cause_id}&user=0`);
    if (isAD === "true") {
      const response = await API.get(`ad?id=${cause_id}&user=0`);

      if (response.status === "OK") {
        setPostDetails(response.AD[0]);
        setName(response.AD[0].createdBy.name);
        setProfImg(response.AD[0].createdBy.profile_img);
        setAppreciateName(response.AD[0].interest_count.length + " interested");
      }
    } else {
      const response = await API.get(`cause?id=${cause_id}&user=0`);
      if (response.status === "OK") {
        setPostDetails(response.cause[0]);
        setName(response.cause[0].createdBy.name);
        setProfImg(response.cause[0].createdBy.profile_img);
        setAppreciateName(
          response.cause[0].appreciateBy.length + " appreciated"
        );
      }
    }
  };
  const _handleAppreciateClick = async () => {
    if (isAD === "true") {
      await API.post(
        "interest/" + cause_id,
        postDetails.interest_count.concat([
          {
            name: localStorage.getItem("name"),
          },
        ])
      );
      setAppreciateName(
        `you and ${postDetails.interest_count.length} others interested`
      );
    } else {
      await API.post(
        "appreciate/" + cause_id,
        postDetails.appreciateBy.concat([
          {
            name: localStorage.getItem("name"),
          },
        ])
      );
      setAppreciateName(
        `you and ${postDetails.appreciateBy.length} others appreciated`
      );
    }
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
            <img
              height="3%"
              width="3%"
              style={{ cursor: "pointer" }}
              src={back}
              alt="back"
              onClick={() => history.push("/home")}
            />

            <div className="detail-header">{postDetails.title}</div>
            <div className="posts-header">
              <div className="post-header-image-container">
                <img src={profImg} alt="pr" className="post-header-image"></img>
              </div>
              <div className="post-header-name-container">
                <span className="post-header-title">{name}</span>
                <span className="post-header-subtitle">
                  {isAD === "true" ? (
                    <span
                      style={{
                        padding: "3%",
                        paddingInline: "6%",
                        marginLeft: "1%",
                        backgroundColor: "#ffc107",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        marginTop: "0.1rem",
                        marginBottom: "1.1rem",
                      }}
                    >
                      Ad
                    </span>
                  ) : (
                    postDetails.dateCreated
                  )}
                </span>
              </div>
            </div>

            <div className="post-detail-section">
              <div className="post-detail-image-container">
                <img
                  className="card-img-top"
                  src={postDetails.media}
                  alt="img"
                  // height="400"
                />
              </div>
              <p className="card-text">{postDetails.content}</p>
              <p className="card-text mt-3" style={{ color: "grey" }}>
                {appreciateName}
              </p>
              <div className="posts-footer mr-4 ml-4">
                <div className="appreciate">
                  <button
                    className="appreciate-button"
                    onClick={_handleAppreciateClick}
                  >
                    <img
                      src={isAD === "true" ? heart : appreciate_ico}
                      alt="ico"
                    />
                    <span>{isAD === "true" ? "interested" : "appreciate"}</span>
                  </button>
                </div>
                <div className="comment">
                  <button
                    className="appreciate-button"
                    onClick={() => alert("enter your comment")}
                  >
                    <img src={comment_ico} alt="ico" />
                    <span>comment</span>
                  </button>
                </div>
                <div className="volunteer">
                  <button
                    className="appreciate-button"
                    onClick={_handleVolunteerModal}
                  >
                    <img
                      src={isAD === "true" ? operator : volunteer_ico}
                      alt="ico"
                    />
                    <span>{isAD === "true" ? "connect" : "volunteer"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="comment-container container pt-4 pb-5 pr-4 pl-4">
            <div className="comment-header">Comments ({comments.length})</div>
            <div className="input-comment mt-5 mb-5">
              <input
                className="comment-box"
                placeholder="comment"
                onInput={(e) => setInComment(e.target.value)}
                value={inComment}
                autoFocus={true}
              />
              <img
                src={plane}
                alt="img"
                className="plane-ico"
                onClick={_createComments}
              />
            </div>
            <div className="old-comment-container mt-4">
              {comments.map((obj) => {
                return (
                  <Comment
                    src={obj.commented_by.profile_img}
                    name={obj.commented_by.name}
                    desc={obj.desc}
                    time={obj.dateCreated}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {isShowVolunteerModal ? (
        <VolunteerModal
          onClick={() => {
            setShowVolunteer(false);
          }}
          postId={cause_id}
          isLead={isAD === "true" ? true : false}
        />
      ) : null}
    </>
  );
};

export default DetailsScreen;
