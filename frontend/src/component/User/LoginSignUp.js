import React, { Fragment, useRef, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "./LoginSignUp.css";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";
import { useAlert } from "react-alert";
import axios from 'axios';

const LoginSignUp = ({ location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const { error, isAuthenticated } = useSelector((state) => state.user);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("https://res.cloudinary.com/dpb0wztgv/image/upload/v1652804609/avatars/Profile_ad0z2t.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    window.localStorage.setItem('user_email', loginEmail);
  }


  const registerSubmit = async (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    if (password !== confirmPassword) {
      alert.error('Password doesn\'t match, please check');
    } else {
      if (!agree) {
        alert.error('Please check for agreement');
      } else {
        try {
          const data = await axios.post('/api/v1/register', myForm);
          alert.success(data.data.message);
          history.push(data.data.redirect);
        }
        catch (err) {
          console.log(err);
        }
      }
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }

  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      <Fragment>
        <div className="LoginSignUpContainer">
          <div className="artoftri-logo-container">
            <img className="artoftri-logo" src="/images/artoftri-logo.png" alt="artoftri-logo" />
          </div>
          <div className="LoginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link className="forgot-btn" to="/password/forgot">Forgot Password?</Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>

            <form className="signUpForm" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
              <div className="signUpName">
                <FaceIcon />
                <input type="text" placeholder="Name" required name="name" value={name} onChange={registerDataChange} />
              </div>
              <div className="signUpEmail">
                <MailOutlineIcon />
                <input type="email" placeholder="Email" required name="email" value={email} onChange={registerDataChange} />
              </div>
              <div className="signUpPassword">
                <LockOpenIcon />
                <input type="password" placeholder="Password" required name="password" value={password} onChange={registerDataChange} />
              </div>
              <div className="confirmPassword">
                <LockOpenIcon />
                <input type="password" placeholder="Confirm Password" required name="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input type="file" name="avatar" accept="image/*" onChange={registerDataChange} />
              </div>
              <input type="submit" value="Register" className="signUpBtn" />
              <div className="privacy-policy-container">
                <input type="checkbox" value={agree} onChange={(e) => setAgree(e.target.checked)} />
                <p>All of the information that you provide will be treated as confidential and will only be used for research purposes only to follow the Data privacy act of 2012.</p>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

export default LoginSignUp;
