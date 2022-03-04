import React, {useState, useEffect} from "react";
import ChatApp from "./ChatApp";
import DatabaseContext from "./databaseContext";
import "firebase/compat/auth";
import googleLogo from "../images/googleLogo.svg";
import {
    startApp,
    signInWithEmail,
    getUser,
    seeAuthState,
    enterUserToDatabase
} from "./serverFunctions";

startApp();

function LoginForm() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(() => getUser());


    useEffect(() => { //checks to see if user has been logged in
        const unsubscribe = seeAuthState().onAuthStateChanged((user) => {
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
                        <div id="loginForm__loginButton" onClick={signInWithEmail}>
                            <img src={googleLogo} alt="googleLogo"/>
                            <h1>Sign in with Google</h1>
                        </div>
                    </form>
                </div>
            </div>
        );
    };


    if (user) { //user is logged in

        let contextData = { //context will be used to help pass info between components
            uid: user._delegate.uid,
        };

        enterUserToDatabase('users', user._delegate.uid, user._delegate.email);

        return (
            <DatabaseContext.Provider value={contextData}>
                <ChatApp />
            </DatabaseContext.Provider>
        );
    } else {
        return getLogin();
    }
}

export {LoginForm};
