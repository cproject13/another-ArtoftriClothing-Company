import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useHistory } from "react-router-dom";
import "./Profile.css";


const Profile = () => {
  const history = useHistory()
  const { user, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  
    window.localStorage.setItem('user',user.name);
  }, [history, isAuthenticated,user.name]);
  return (
    <Fragment>
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1 className="title-profile">My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div className="info-container">
              <div>
                <h4>Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email Address</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
    </Fragment>
  );
};

export default Profile;
