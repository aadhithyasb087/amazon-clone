import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { darkLogo } from "../../assets/index";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientName, setClientName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errClientName, setErrClientName] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your name");
    }
    if (!email) {
      setErrEmail("Enter your email");
      setFirebaseErr("");
    } else if (!validateEmail(email)) {
      setErrEmail("Enter valid email");
    }
    if (!password) {
      setErrPassword("Enter your password");
    } else if (password.length < 6) {
      setErrPassword("Password must be at least 6 characters");
    }

    if (!confirmPassword) {
      setErrConfirmPassword("Please enter confirm password");
    } else if (confirmPassword !== password) {
      setErrConfirmPassword("Password not matched");
    }

    if (
      clientName &&
      validateEmail(email) &&
      password &&
      password.length >= 6 &&
      confirmPassword &&
      confirmPassword === password
    ) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: clientName,
          });
          // Signed up
          const user = userCredential.user;
          setClientName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setFirebaseErr("");
          setLoading(false);
          setSuccessMsg("Account Created Successfully!");
          setTimeout(() =>
          {
            setSuccessMsg("")
            navigate("/login");
          }, 3000);
        })
        .catch((error) =>
        {
          setLoading(false);
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("Email Already in use, Try another one");
          }
          // ..
        });
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  return (
    <div className="register">
      <Link to="/">
        <img src={darkLogo} alt="amazon-logo" className="register__logo" />
      </Link>
      <form>
        <div className="register__container">
          <h1>Create Account</h1>
          <h5>Your name</h5>
          <input
            type="text"
            value={clientName}
            className={
              errClientName
                ? "register__cont__input register__input__error"
                : "register__cont__input"
            }
            onChange={(e) => {
              setClientName(e.target.value);
              setErrClientName("");
            }}
          />
          {errClientName && (
            <p className="register__error__text">
              <span>!</span>
              {errClientName}
            </p>
          )}
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            className={
              errEmail
                ? "register__cont__input register__input__error"
                : "register__cont__input"
            }
            onChange={(e) => {
              setEmail(e.target.value);
              setErrEmail("");
            }}
          />
          {errEmail && (
            <p className="register__error__text">
              <span>!</span>
              {errEmail}
            </p>
          )}
          {firebaseErr && (
            <p className="register__error__text">
              <span>!</span>
              {firebaseErr}
            </p>
          )}
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            className={
              errPassword
                ? "register__cont__input register__input__error"
                : "register__cont__input"
            }
            onChange={(e) => {
              setPassword(e.target.value);
              setErrPassword("");
            }}
          />
          {errPassword && (
            <p className="register__error__text">
              <span>!</span>
              {errPassword}
            </p>
          )}
          <h5>Confirm Password</h5>
          <input
            type="password"
            value={confirmPassword}
            className={
              errConfirmPassword
                ? "register__cont__input register__input__error"
                : "register__cont__input"
            }
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrConfirmPassword("");
            }}
          />
          {errConfirmPassword && (
            <p className="register__error__text">
              <span>!</span>
              {errConfirmPassword}
            </p>
          )}
          <button
            className="register__continueButton"
            onClick={registerHandler}
          >
            Continue
          </button>
          {loading && (
            <div className="register__rotatinglines">
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
            <div className="register__success">
              <motion.p
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {successMsg}
              </motion.p>
            </div>
          )}
          <p className="register__text">
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
          <div>
            <p className="register__login">
              Already have an account?{" "}
              <Link to={"/login"}>
                <span>Sign in</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
