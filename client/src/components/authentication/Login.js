import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { darkLogo } from "../../assets/index";
import { motion } from "framer-motion";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/amazonSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errUserEmail, setUserErrEmail] = useState("");
  const [errUserPassword, setUserErrPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrEmail("Enter your email");
    } else if (!validateEmail(email)) {
      setErrEmail("Enter valid email");
    }
    if (!password) {
      setErrPassword("Enter your password");
    } else if (password.length < 6) {
      setErrPassword("Password must be at least 6 characters");
    }
    if (email && password && password.length >= 6) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(
            setUserInfo({
              _id: user.uid,
              userName: user.displayName,
              email: user.email,
            })
          );

          setLoading(false);
          setSuccessMsg("Logged In Successfully! Welcome you back");
          setTimeout(() => {
            setSuccessMsg("");
            setEmail("");
            setPassword("");
            setUserErrEmail("");
            setUserErrPassword("");
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.code);
          const errorCode = error.code;
          if (errorCode === "auth/invalid-credential") {
            setUserErrEmail("Invalid Email");
            setUserErrPassword("Wrong Password! try again");
          }
        });
    }
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  return (
    <div className="login">
      <Link to="/">
        <img src={darkLogo} alt="amazon-logo" className="login__logo" />
      </Link>
      <form>
        <div className="login__container">
          <h1>Sign-in</h1>

          <h5>E-mail or mobile phone number</h5>
          <input
            type="text"
            value={email}
            className={
              errEmail
                ? "login__cont__input login__input__error"
                : "login__cont__input"
            }
            onChange={(e) => {
              setEmail(e.target.value);
              setErrEmail("");
              setUserErrEmail("");
            }}
          />
          {errEmail && (
            <p className="login__error__text">
              <span>!</span>
              {errEmail}
            </p>
          )}
          {errUserEmail && (
            <p className="login__error__text">
              <span>!</span>
              {errUserEmail}
            </p>
          )}
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            className={
              errPassword
                ? "login__cont__input login__input__error"
                : "login__cont__input"
            }
            onChange={(e) => {
              setPassword(e.target.value);
              setErrPassword("");
              setUserErrPassword("");
            }}
          />
          {errPassword && (
            <p className="login__error__text">
              <span>!</span>
              {errPassword}
            </p>
          )}
          {errUserPassword && (
            <p className="login__error__text">
              <span>!</span>
              {errUserPassword}
            </p>
          )}
          <button className="login__signInButton" onClick={signInHandler}>
            Sign In
          </button>
          {loading && (
            <div className="login__rotatinglines">
              <RotatingLines
                visible={true}
                height="96"
                width="50"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          {successMsg && (
            <div className="login__success">
              <motion.p
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {successMsg}
              </motion.p>
            </div>
          )}
          <p className="login__text">
            By signing-in you agree to the Amazon Fake Clone's
            <Link to="/fakepolicy">
              {" "}
              <span>Conditions of use </span>
            </Link>
            and{" "}
            <Link to="/fakepolicy">
              <span>Privacy Notice</span>
            </Link>
          </p>
        </div>
        <p className="login__newtoamzon">
          <span className="newtoamazon__spanleft"></span>
          <span className="newtoamazon__text">New to Amazon ?</span>
          <span className="newtoamazon__spanright"></span>
        </p>
        <Link to="/register">
          <button className="login__registerButton">
            Create your Amazon account
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
