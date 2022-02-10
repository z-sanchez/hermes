import React from "react";
import Clock from "./Clock";
import ContactList from "./ContactList";
import DatabaseContext from "./databaseContext";

import "firebase/compat/auth";
import "firebase/compat/firestore";


class ChatApp extends React.Component {
  static contextType = DatabaseContext;

  constructor(props) {
    super(props);
    this.bottomChatRef = React.createRef();
    this.queryRef = React.createRef();
    this.collectionRef = React.createRef();

    this.state = {
      messages: [],
      collection: null,
      adding: false,
    };
  }

  componentDidMount() {
    //set up chat app opening
    document.querySelector("#root").style.backgroundImage = "none";
    this.bottomChatRef.current.scrollIntoView({ behavior: "smooth" });

    //access database and fill messages in state
    this.collectionRef = this.context.database.collection("messages");
    this.queryRef.current = this.context.database
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(10);
    this.getMessages = this.queryRef.current.onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (this.queryRef.current) {
        this.setState({
          messages: data.reverse(),
          collection: this.collectionRef,
        });
      }
    });
  }

  componentWillUnmount() {
    this.getMessages(); //unsubscribe to database

    //switch background
    document.querySelector("#root").style.backgroundImage =
      "url(http://localhost:3000/static/media/background-dark.b8e12852bbefc8a56091.svg)";
  }

  componentDidUpdate() {
    //scroll to recent message
    this.bottomChatRef.current.scrollIntoView({ behavior: "smooth" });
  }

  handleOnSend = () => {
    const message = document.getElementById("message").value.trim();
    const query = this.state.collection;

    if (message) {
      query.add({
        text: message,
        createdAt: this.context.firebase.firestore.FieldValue.serverTimestamp(),
        received: false,
      });
    }

    document.getElementById("message").value = "";
  };

  setStateAdding = () => {
    this.setState({
      adding: !this.state.adding,
    });

  }

  renderMessages() {
    let lastReceivedIndex = false,
      lastSentIndex = false;

    const messages = this.state.messages.map((e, index) => {
      if (e.received) {
        lastReceivedIndex = index;
        return (
          <p key={index} className="receivedMessage">
            {e.text}
          </p>
        );
      } else {
        lastSentIndex = index;
        return (
          <p key={index} className="sentMessage">
            {e.text}
          </p>
        );
      }
    });

    if (lastReceivedIndex !== false) {
      messages[lastReceivedIndex] = (
        <p key={lastReceivedIndex} className="lastReceivedMessage">
          {this.state.messages[lastReceivedIndex].text}
        </p>
      );
    }

    if (lastSentIndex !== false) {
      messages[lastSentIndex] = (
        <p key={lastSentIndex} className="lastSentMessage">
          {this.state.messages[lastSentIndex].text}
        </p>
      );
    }

    return messages;
  }

  render() {
    return (
      <div id="appGrid">
        <div id="header">
          <h1 onClick={this.props.signOut}>HERMES</h1>
          <Clock />
        </div>
        <div id="contacts">
          <div id="buttonBar">
            <input type="search" id="searchBar" placeholder="Search ..." />
            <button id="addButton" className="buttons" onClick={this.setStateAdding}>
              Add
            </button>
          </div>
          <ContactList adding={this.state.adding} />
        </div>
        <div id="chat">
          <div id="receiver">
            <p>Darth Vader</p>
          </div>
          <div id="chatWindow">
            {this.renderMessages()}
            <div ref={this.bottomChatRef} />
          </div>
          <div id="messageBar">
            <input id="message" placeholder="type a message ..." type="text" />
            <button
              id="sendMessage"
              onClick={this.handleOnSend}
              className="buttons"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatApp;
