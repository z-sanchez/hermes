import React from "react";
import Clock from "./Clock";
import ContactList from "./ContactList";
import DatabaseContext from "./databaseContext";
import dropDownArrow from "../images/dropdownArrow.svg";

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
      currentContact: null,
      currentContactName: null,
    };
  }

  updateCurrentContact = (contactUID, contactName) => {
    //access database and fill messages in state
    this.collectionRef = this.context.database.collection(
      this.getConversationID(contactUID)
    );

    this.queryRef.current = this.context.database
      .collection(this.getConversationID(contactUID))
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
          currentContact: contactUID,
          currentContactName: contactName,
        });
      }
    });
  };

  componentDidMount() {
    //set up chat app opening
    this.getMessages = () => {
      return null;
    };

    document.querySelector("#root").style.background = "#282D34";
    this.bottomChatRef.current.scrollIntoView({ behavior: "smooth" });
  }

  componentWillUnmount() {
    this.getMessages(); //unsubscribe to database

    //switch background
    document.querySelector("#root").style.background =
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
      currentContactName: this.state.currentContactName,
    };

    //add img element to ContactList, render it if mobile otherwise just contactHeader
    // line 167 and 174 will do a check to see if screen is mobile, both will render. 167 with a normal component
    // and 167 with mobile class. While the other is active the other will not be due to css styling.

    return (
      <div id="appGrid">
        <div id="header">
          <h1 onClick={this.props.signOut}>HERMES</h1>
          <Clock />
        </div>
        <ContactList mobile={false} currentContact={currentContact} />
        <div id="chat">
          <ContactList mobile={true} currentContact={currentContact} />
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
