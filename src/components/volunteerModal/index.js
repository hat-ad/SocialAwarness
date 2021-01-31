import React, { useState } from "react";
import "./style.css";

import API from "../../API/service/api";
const VolunteerModal = ({ onClick, isLead, postId, postCreatorId }) => {
  // const [lead, setlead] = useState(false)
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const _handleSubmit = async () => {
    let data = {
      name: name,
      ph_no: contact,
      post: postId,
      createdBy: `${localStorage.getItem("name")}Image${localStorage.getItem(
        "profile_Img"
      )}`,
      createdById: localStorage.getItem("userID"),
      postCreatorId: postCreatorId,
    };

    if (!isLead) data.location = address;

    const response = await API.post(isLead ? "lead" : "volunteer", data);
    console.log("lead ", response);

    //TODO : add the post added status using redux
  };
  return (
    <div className="modal-container">
      <div className="modal-volunteer container">
        <div className="modal-head-sec">
          <span className="modal-head-title">
            {isLead ? "Show Your Interest" : "Volunteer With Us"}
          </span>
          <span className="close" onClick={onClick}>
            &times;
          </span>
        </div>
        <hr />
        <div className="modal-mid-sec">
          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputEmail3"
                onInput={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Contact
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="inputEmail3"
                onInput={(e) => setContact(e.target.value)}
              />
            </div>
          </div>
          {isLead ? null : (
            <>
              <div className="form-group row">
                <label for="inputPassword3" className="col-sm-2 col-form-label">
                  Address
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword3"
                    onInput={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="modal-footer-sec">
          <div className="modal-post-button-container">
            <button
              className="modal-post-button"
              onClick={() => {
                _handleSubmit();
                onClick();
              }}
            >
              {isLead ? "Interested" : "Volunteer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerModal;
