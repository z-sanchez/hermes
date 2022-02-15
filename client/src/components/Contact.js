import React from "react";
import DatabaseContext from "./databaseContext";

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

  updateCurrentContact = () => {
      this.props.currentContact.updateContact("3");
  }
  render() {
    if (this.props.adding === false) {
      return (
        <div className="contact contact--active" onClick={this.updateCurrentContact}>
          <div className="contact__activeBar--lit" />
          <div
            className="contactImage--border"
            id={this.props.contactData.uid}
          />
          <div className="contact__text">
            <h1>Darth Vader</h1>
            <p>
              Thanks for having me man!Thanks for having me man! Thanks for
              having me man! Thanks for having me man! Thanks for having me man!{" "}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="contact">
          <div className="contact__activeBar" />
          <div
            className="contactImage--border"
            id={this.props.contactData.uid}
          />
          <div className="contact__text contact__text--name">
            <h1>{this.props.contactData.name}</h1>
          </div>
        </div>
      );
    }
  }
}

export default Contact;
