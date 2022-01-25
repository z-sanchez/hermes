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
    return <h1 onClick={this.props.signOut}>Hello World!</h1>;
  }
}

export default ChatApp;
