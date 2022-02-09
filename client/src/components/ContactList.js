import React from "react";
import Contact from "./Contact";
import DatabaseContext from "./databaseContext";
import uniqid from 'uniqid';

//getContactList user codes

class ContactList extends React.Component {
  static contextType = DatabaseContext;

  constructor(props) {
    super(props);
    this.state = {
      contacts: null,
    };
  }

  componentDidMount() {
    let contacts = this.context.database.collection(this.context.uid);

    //grabs all user contacts from database
    this.getContacts = contacts.onSnapshot((querySnapshot) => {
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

  renderContacts() {

    let contacts = this.state.contacts.map((contact) => {
        return <Contact key={uniqid()} contactData={contact}/>
    })

    return contacts;
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
