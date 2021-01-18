import React, { useState } from "react";
import "./style.css";

const VolunteerModal = ({ onClick, isLead }) => {
  // const [lead, setlead] = useState(false)

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
          {isLead ? (
            <>
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-2 col-form-label">
                  name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail3"
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
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-2 col-form-label">
                  name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail3"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="inputPassword3" className="col-sm-2 col-form-label">
                  Contact
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    id="inputPassword3"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="inputPassword3" className="col-sm-2 col-form-label">
                  Address
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword3"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="modal-footer-sec">
          <div className="modal-post-button-container">
            <button className="modal-post-button">
              {isLead ? "Interested" : "Volunteer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerModal;
