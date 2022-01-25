import React from "react";

class ChatApp extends React.Component {
    componentDidMount() {
        document.querySelector("#root").style.backgroundImage = "none";
    }

    componentWillUnmount() {
        document.querySelector("#root").style.backgroundImage =
            'url(http://localhost:3000/static/media/background-dark.b8e12852bbefc8a56091.svg)';
    }

    render() {
        return (
            <div id="appGrid">
                <div id="header">
                    <h1 onClick={this.props.signOut}>HERMES</h1>
                    <p id="clock">7:30pm</p>
                </div>
                <div id="contacts">
                    <div id="buttonBar">
                        <input type="search" id="searchBar" placeholder="Search ..."/>
                        <button id="addButton" className="buttons">Add</button>
                    </div>
                    <div id="contactsList">
                        <p id="noContacts">No Contacts</p>
                    </div>
                </div>
                <div id="chat">
                    <div id="receiver">
                        <p>Darth Vader</p>
                    </div>
                    <div id="chatWindow">
                        <p className="receivedMessage">When I left you, I was but a learner ...</p>
                        <p className="lastReceivedMessage">But now I am the master!</p>
                        <p className="sentMessage">Lol. Wut?</p>
                    </div>
                    <div id="messageBar">
                        <input id="message" placeholder="type a message ..." type="text"/>
                        <button id="sendMessage" className="buttons">Send</button>
                    </div>
                </div>
            </div>);
    }
}

export default ChatApp;
