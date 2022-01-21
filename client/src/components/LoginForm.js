import React from "react";

function LoginForm() {
    return (
        <body>
        <h1 id="logo">Hermes</h1>
        <form id="loginForm">
            <h1 id="loginForm__title">Login</h1>
            <p id="loginForm__signUp">
                Don't have an account? <a href="https://google.com">Sign Up</a>
            </p>
            <div className="loginForm__field">
                <h1 className="field__text">Email Address</h1>
                <input
                    type="text"
                    value="you@example.com"
                    className="field__enterInfo"
                />
            </div>
            <div className="loginForm__field">
                <h1 className="field__text">Password</h1>
                <input type="text" value="Enter 6 characters or more" className="field__enterInfo"/>
            </div>
            <div id="loginForm__rememberMe">
                <input id="rememberMe__checkbox" type="checkbox"/>
                <p id="rememberMe__text">Remember Me</p>
            </div>
            <input id="loginForm__loginButton" type="submit" value="Login"/>
        </form>
        </body>
    );
}

export default LoginForm;
