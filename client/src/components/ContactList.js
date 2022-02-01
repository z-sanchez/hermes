import React from "react";
import Darth from "../images/darth.jpg";

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: 1,
    };
  }

  renderContacts() {
    return (
      <div className="contact contact--active">
        <div className="contact__activeBar--lit" />
        <img alt="contactImage" src={Darth} />
        <div className="contact__text">
          <h1>Darth Vader</h1>
          <p>Thanks for having me man!Thanks for having me man! Thanks for having me man! Thanks for having me man! Thanks for having me man!  </p>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.contacts === null) {
      return (
        <div id="contactsList">
          <p id="noContacts">No Contacts</p>
        </div>
      );
    } else {
      return <div id="contactsList">{this.renderContacts()}</div>;
    }
  }
}

export default ContactList;
