import React from "react";
import Contact from "./Contact";
import DatabaseContext from "./databaseContext";
import uniqid from "uniqid";

//getContactList user codes

class ContactList extends React.Component {
  static contextType = DatabaseContext;

  constructor(props) {
    super(props);
    this.state = {
      contacts: null,
      users: null,
    };
  }

  componentDidMount() {
    this.getContacts();
    this.getUsers();
  }

  getContacts = () => {
    //grabs all user contacts from database
    let contacts = this.context.database.collection(this.context.uid);
    this.getContactsQuery = contacts.onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (contacts) {
        this.setState({
          contacts: data,
        });
      }
    });
  }

  getUsers = () => {
    //grabs all user contacts from database
    let contacts = this.context.database.collection("users");
    this.getUsersQuery = contacts.onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (contacts) {
        this.setState({
          users: data,
        });
      }
    });
  }

  renderContacts() {
    if (this.props.adding) {
      return this.state.users.map((contact) => {
        return (
            <Contact
                key={uniqid()}
                adding={this.props.adding}
                contactData={contact}
            />
        );
      });
    }
    else {
      return this.state.contacts.map((contact) => {
        return (
            <Contact
                key={uniqid()}
                adding={this.props.adding}
                contactData={contact}
            />
        );
      });
    }
  }

  render() {
    if (this.state.contacts !== null) {
      return <div id="contactsList">{this.renderContacts()}</div>;
    } else {
      return (
        <div id="contactsList">
          <p id="noContacts">No Contacts</p>
        </div>
      );
    }
  }
}

export default ContactList;
