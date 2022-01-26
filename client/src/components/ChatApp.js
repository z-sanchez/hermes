import React from "react";
import Clock from "./Clock";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }
  componentDidMount() {
    document.querySelector("#root").style.backgroundImage = "none";
    Clock();

    const db = this.props.firebase.firestore();
    const query = db.collection("messages").orderBy("createdAt").limit(10);

    query.onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      this.setState({
        messages: data,
      });
    });
  }

  componentWillUnmount() {
    document.querySelector("#root").style.backgroundImage =
      "url(http://localhost:3000/static/media/background-dark.b8e12852bbefc8a56091.svg)";
  }

  renderMessages() {
    return this.state.messages.map((e, index) => {
      if (e.received) {
        return (
          <p key={index} className="receivedMessage">
            {e.text}
          </p>
        );
      } else {
        return (
          <p key={index} className="sentMessage">
            {e.text}
          </p>
        );
      }
    });
  }

  render() {
    return (
      <div id="appGrid">
        <div id="header">
          <h1 onClick={this.props.signOut}>HERMES</h1>
          <p id="clock">Clock</p>
        </div>
        <div id="contacts">
          <div id="buttonBar">
            <input type="search" id="searchBar" placeholder="Search ..." />
            <button id="addButton" className="buttons">
              Add
            </button>
          </div>
          <div id="contactsList">
            <p id="noContacts">No Contacts</p>
          </div>
        </div>
        <div id="chat">
          <div id="receiver">
            <p>Darth Vader</p>
          </div>
          <div id="chatWindow">{this.renderMessages()}</div>
          <div id="messageBar">
            <input id="message" placeholder="type a message ..." type="text" />
            <button id="sendMessage" className="buttons">
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatApp;
