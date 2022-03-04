import React from "react";
import Clock from "./Clock";
import ContactList from "./ContactList";
import DatabaseContext from "./databaseContext";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {signOut, getFirebase, getAllChatMessages, getConversationID} from "./serverFunctions";

class ChatApp extends React.Component {
    static contextType = DatabaseContext;

    constructor(props) {
        super(props);
        this.bottomChatRef = React.createRef(); //ref used to render scroll screen to bottom of chat
        this.updateCurrentContact = this.updateCurrentContact.bind(this);

        this.state = {
            messages: [],
            collection: null,
            currentContact: null,
            currentContactName: null,
        };
    }

    componentDidMount() {
        this.getMessages = () => {
            return null
        } //this is used later for subscription to messages
        document.querySelector("#root").style.background = "#282D34"; //changing from graphic background
        this.bottomChatRef.current.scrollIntoView({behavior: "smooth"}); //scrolls recent message into view
    }


    componentDidUpdate() {
        //scroll to recent message
        this.bottomChatRef.current.scrollIntoView({behavior: "smooth"});
    }

    componentWillUnmount() {
        this.getMessages(); //unsubscribe from message updates
    }


    //break into separate file
    //access database and fill messages in state
    updateCurrentContact = (contactUID, contactName) => {
        const collection = getAllChatMessages(getConversationID(this.context.uid, contactUID));

        const query = collection.orderBy("createdAt", "desc").limit(10); //query for last 10 messages in desc order (first to recent)

        this.getMessages = query.onSnapshot((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            if (query) {
                this.setState({
                    messages: data.reverse(),
                    collection: collection,
                    currentContact: contactUID,
                    currentContactName: contactName,
                });
            }
        });
    };


    handleOnSend = () => {
        if (this.state.currentContact === null) return; //if no contact
        const message = document.getElementById("message").value.trim();
        const query = this.state.collection;

        if (message) {
            query.add({ //function could be elsewhere
                text: message,
                createdAt: getFirebase().firestore.FieldValue.serverTimestamp(),
                sentBy: this.context.uid,
            });
        }

        document.getElementById("message").value = "";
    };


    renderMessages() {
        let lastReceivedIndex = null,
            lastSentIndex = null;

        const messages = this.state.messages.map((e, index) => {
            if (e.sentBy !== this.context.uid) { //prepares received messages
                lastReceivedIndex = index;
                return (
                    <p key={index} className="receivedMessage">
                        {e.text}
                    </p>
                );
            } else { //prepares sent messages
                lastSentIndex = index;
                return (
                    <p key={index} className="sentMessage">
                        {e.text}
                    </p>
                );
            }
        });

        if (lastReceivedIndex !== null) { //changes styling for last message
            messages[lastReceivedIndex] = (
                <p key={lastReceivedIndex} className="lastReceivedMessage">
                    {this.state.messages[lastReceivedIndex].text}
                </p>
            );
        }

        if (lastSentIndex !== null) { //changes styling for last message
            messages[lastSentIndex] = (
                <p key={lastSentIndex} className="lastSentMessage">
                    {this.state.messages[lastSentIndex].text}
                </p>
            );
        }

        return messages;
    }


    render() {
        let currentContact = { //current contact info for other components to read plus a method for updating current contact
            updateContact: this.updateCurrentContact,
            currentContact: this.state.currentContact,
            currentContactName: this.state.currentContactName,
        };

        return (
            <div id="appGrid">
                <div id="header">
                    <h1 onClick={signOut}>HERMES</h1>
                    <Clock/>
                </div>
                <ContactList mobile={false} currentContact={currentContact}/>
                <div id="chat">
                    <ContactList mobile={true} currentContact={currentContact}/>
                    <div id="chatWindow">
                        {this.renderMessages()}
                        <div ref={this.bottomChatRef}/>
                    </div>
                    <div id="messageBar">
                        <input
                            autoComplete="off"
                            id="message"
                            placeholder="type a message ..."
                            type="text"
                        />
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
