import React from "react";
// import Darth from "../images/darth.jpg";
import DatabaseContext from "./databaseContext";

//get user data and push to state
//active or not
//mount contact image
//get last text

class Contact extends React.Component {
  static contextType = DatabaseContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.getElementById(
        this.props.contactData.uid
    ).style.backgroundImage = `url( ${this.props.contactData.profilePic})`;
  }

  render() {
    return (
      <div className="contact contact--active">
        <div className="contact__activeBar--lit" />
        <div className="contactImage--border" id={this.props.contactData.uid} />
        <div className="contact__text">
          <h1>Darth Vader</h1>
          <p>
            Thanks for having me man!Thanks for having me man! Thanks for having
            me man! Thanks for having me man! Thanks for having me man!{" "}
          </p>
        </div>
      </div>
    );
  }
}

export default Contact;
