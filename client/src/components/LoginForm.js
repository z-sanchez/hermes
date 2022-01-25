import React, { useState, useEffect } from "react";
import ChatApp from "./ChatApp";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";

import googleLogo from "../images/googleLogo.svg";


// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDOPMnkeXZQ_QZRsU-0gK3clikC6i8btZE",
  authDomain: "hermes-34df3.firebaseapp.com",
  projectId: "hermes-34df3",
  storageBucket: "hermes-34df3.appspot.com",
  messagingSenderId: "19858880682",
  appId: "1:19858880682:web:ac908d6516a297dc58f8d3",
  measurementId: "G-3BQ9HJQMLE",
});

function LoginForm() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(() => firebase.auth.currentUser);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [initializing]);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().useDeviceLanguage();

    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      console.log("yeet");
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getLogin = () => {
    return (
      <div className="body">
        <h1 id="logo">HERMES</h1>
        <form id="loginForm">
          <h1 id="loginForm__title">Login</h1>
          <p id="loginForm__signUp">
            Don't have an account?{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp"
            >
              Sign Up
            </a>
          </p>
          <div id="loginForm__loginButton" onClick={signInWithGoogle}>
            <img src={googleLogo} alt="googleLogo" />
            <h1>Sign in with Google</h1>
          </div>
        </form>
      </div>
    );
  };

  return user ? (<ChatApp signOut={signOut} /> ): (getLogin());
}

export default LoginForm;
