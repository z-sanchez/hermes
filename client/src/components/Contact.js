import React from "react";
import DatabaseContext from "./databaseContext";
import { doc, getDoc, setDoc } from "firebase/firestore";

function isMobile() {
  return window.innerWidth < 1400;
}

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
    this.props.currentContact.updateContact(
      this.props.contactData.uid,
      this.props.contactData.name
    );

    if (isMobile()) this.props.toggleList();
  };

  addContact = async () => {
    const collection = doc(
      this.context.database,
      this.context.uid,
      this.props.contactData.uid
    );

    const document = await getDoc(collection);

    if (!document.exists()) {
      await setDoc(collection, {
        name: this.props.contactData.name,
        profilePic:
          "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        uid: this.props.contactData.uid,
      });
    }
  };

  render() {
    if (this.props.adding === false) {
      if (
        this.props.currentContact.currentContact === this.props.contactData.uid
      ) {
        return (
          <div
            className="contact contact--active"
            onClick={this.updateCurrentContact}
          >
            <div className="contact__activeBar--lit" />
            <div
              className="contactImage--border"
              id={this.props.contactData.uid}
            />
            <div className="contact__text">
              <h1>{this.props.contactData.name}</h1>
            </div>
          </div>
        );
      } else {
        return (
          <div className="contact" onClick={this.updateCurrentContact}>
            <div className="contact__activeBar" />
            <div
              className="contactImage--border"
              id={this.props.contactData.uid}
            />
            <div className="contact__text">
              <h1>{this.props.contactData.name}</h1>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="contact" onClick={this.addContact}>
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
