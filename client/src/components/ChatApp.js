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
    this.updateCurrentContact = this.updateCurrentContact.bind(this);

    this.state = {
      messages: [],
      collection: null,
      adding: false,
      currentContact: null,
    };
  }

  updateCurrentContact = (contactName) => {
    //access database and fill messages in state
    this.collectionRef = this.context.database.collection(
      this.getConversationID(contactName)
    );

    this.queryRef.current = this.context.database
      .collection(this.getConversationID(contactName))
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
          currentContact: contactName,
        });
      }
    });
  };

  componentDidMount() {
    //set up chat app opening
    this.getMessages = () => {return null}
    document.querySelector("#root").style.backgroundImage = "none";
    this.bottomChatRef.current.scrollIntoView({ behavior: "smooth" });
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
    if (this.state.currentContact === null) return;
    const message = document.getElementById("message").value.trim();
    const query = this.state.collection;

    if (message) {
      query.add({
        text: message,
        createdAt: this.context.firebase.firestore.FieldValue.serverTimestamp(),
        sentBy: this.context.uid,
      });
    }

    document.getElementById("message").value = "";
  };

  setStateAdding = () => {
    this.setState({
      adding: !this.state.adding,
    });
  };

  getConversationID(contactUID) {
    let user1 = false,
      user2 = false,
      char = 0,
      uid1 = this.context.uid,
      uid2 = contactUID;

    while (user1 === false && user2 === false) {
      if (uid1[char] === uid2[char]) ++char;
      else if (uid1[char] > uid2[char]) user1 = true;
      else user2 = true;
    }

    return user1 ? uid1.concat(uid2) : uid2.concat(uid1);
  }

  renderMessages() {
    let lastReceivedIndex = false,
      lastSentIndex = false;

    const messages = this.state.messages.map((e, index) => {
      if (e.sentBy !== this.context.uid) {
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
    let currentContact = {
      updateContact: this.updateCurrentContact,
      currentContact: this.state.currentContact,
    };

    return (
      <div id="appGrid">
        <div id="header">
          <h1 onClick={this.props.signOut}>HERMES</h1>
          <Clock />
        </div>
        <div id="contacts">
          <div id="buttonBar">
            <input type="search" id="searchBar" placeholder="Search ..." />
            <button
              id="addButton"
              className="buttons"
              onClick={this.setStateAdding}
            >
              Add
            </button>
          </div>
          <ContactList
            adding={this.state.adding}
            currentContact={currentContact}
          />
        </div>
        <div id="chat">
          <div id="receiver">
            <p>{this.state.currentContact}</p>
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
