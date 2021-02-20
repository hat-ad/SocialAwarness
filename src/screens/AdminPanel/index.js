import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import API from "../../API/service/api";
import { AuthContext } from "../../API/context/index";
import "./style.css";

const Admin = () => {
  const history = useHistory();
  const { token, setToken } = useContext(AuthContext);

  const [postList, setPostList] = useState([]);
  const [isChange, setIsChange] = useState(true);
  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChange]);

  const getPost = async () => {
    const posts = await API.get(isChange ? "cause" : "ad");

    if (posts.status === "OK") {
      setPostList(isChange ? posts.cause : posts.AD);
    }
  };

  const removePosts = async (id) => {
    //API call to remove post
    const response = await API.update((isChange ? "cause/" : "ad/") + id, {
      isApproved: "false",
    });
    console.log(response);
    setPostList(postList.filter((obj) => obj._id !== id));
  };

  const approvePosts = async (id) => {
    //API call to approve post
    const response = await API.update((isChange ? "cause/" : "ad/") + id, {
      isApproved: "true",
    });
    console.log(response);
    setPostList(postList.filter((obj) => obj._id !== id));
  };

  return (
    <div className="container">
      <h1 className="mb-5 mt-5">Admin Panel</h1>
      <div className="row">
        <div className="col-3">
          <div
            className="side-menu"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#454d55",
            }}
          >
            <button
              className="btn btn-tab active"
              onClick={() => (isChange ? "" : setIsChange(true))}
            >
              Causes
            </button>
            <button className="btn btn-tab" onClick={() => setIsChange(false)}>
              Advertisements
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                setToken(null);
                history.push("/");
                localStorage.removeItem("userID");
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                localStorage.removeItem("profile_Img");
                localStorage.removeItem("isAdmin");
              }}
            >
              Log Out
            </button>
          </div>
        </div>
        <div className="col-9">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Details</th>
                <th scope="col">Approve</th>
                <th scope="col">Dismiss</th>
              </tr>
            </thead>
            <tbody>
              {postList.map((obj, index) => (
                <tr
                  style={
                    obj.isApproved === "true" || obj.isApproved === "false"
                      ? { display: "none" }
                      : null
                  }
                >
                  <th scope="row">{index + 1}</th>
                  <td>{obj.title}</td>
                  <td>
                    <Link
                      to={"/details/" + obj._id + "/" + obj.isAd}
                      className="btn btn-primary"
                    >
                      View
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => approvePosts(obj._id)}
                    >
                      Approve
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removePosts(obj._id)}
                    >
                      Dismiss
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
