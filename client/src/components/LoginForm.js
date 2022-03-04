import React, {useState, useEffect} from "react";
import ChatApp from "./ChatApp";
import DatabaseContext from "./databaseContext";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {doc, getDoc, setDoc} from "firebase/firestore";
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


    useEffect(() => { //checks to see if user has been logged in
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


    const signInWithToken = async () => { //signing into firebase with demo credentials
        firebase.auth().signInWithEmailAndPassword('demo@gmail.com', 'demo123')
            .catch(function(error) {
                console.log(error);
            });
    }


    const signOut = async () => { //signing out from firebase
        try {
            await firebase.auth().signOut();
        } catch (error) {
            console.log(error.message);
        }
    };



    const getLogin = () => {
        return (
            <div id="loginBackGround">
                <div className="wrapper">
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
                        <div id="loginForm__loginButton" onClick={signInWithToken}>
                            <img src={googleLogo} alt="googleLogo"/>
                            <h1>Sign in with Google</h1>
                        </div>
                    </form>
                </div>
            </div>
        );
    };


    if (user) { //user is logged in
        let db = firebase.firestore(); //create database to put into context

        let contextData = { //context will be used to help pass info between components
            firebase: firebase,
            uid: user._delegate.uid,
            database: db,
        };

        const docRef = doc(db, "users", contextData.uid); //create a doc reference to users name in database

        async function docSnap() {
            const doc = await getDoc(docRef);
            if (!doc.exists()) {
                //if user does not exist in database, add them in
                await setDoc(docRef, {
                    name: user._delegate.email,
                    profilePic:
                        "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                    uid: user._delegate.uid,
                });
            }
        }

        docSnap();

        return (
            <DatabaseContext.Provider value={contextData}>
                <ChatApp signOut={signOut}/>
            </DatabaseContext.Provider>
        );
    } else {
        return getLogin();
    }
}

export {LoginForm};
