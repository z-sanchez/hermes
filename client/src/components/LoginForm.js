import React from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";

// Initialize Firebase
firebase.initializeApp({apiKey: "AIzaSyDOPMnkeXZQ_QZRsU-0gK3clikC6i8btZE",
    authDomain: "hermes-34df3.firebaseapp.com",
    projectId: "hermes-34df3",
    storageBucket: "hermes-34df3.appspot.com",
    messagingSenderId: "19858880682",
    appId: "1:19858880682:web:ac908d6516a297dc58f8d3",
    measurementId: "G-3BQ9HJQMLE",});




class LoginForm extends React.Component {
  signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().useDeviceLanguage();

    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <div className="body">
        <h1 id="logo">HERMES</h1>
        <form id="loginForm" onClick={this.signInWithGoogle}>
          <h1 id="loginForm__title">Login</h1>
          <p id="loginForm__signUp">
            Don't have an account? <a href="https://google.com">Sign Up</a>
          </p>
          <div className="loginForm__field">
            <h1 className="field__text">Email Address</h1>
            <input
              type="text"
              placeholder={"you@example.com"}
              className="field__enterInfo"
            />
          </div>
          <div className="loginForm__field">
            <h1 className="field__text">Password</h1>
            <input
              type="text"
              placeholder={"Enter 6 characters or more"}
              className="field__enterInfo"
            />
          </div>
          <input id="loginForm__loginButton" type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
