import React from "react";
import Contact from "./Contact";
import DatabaseContext from "./databaseContext";


//getContactList user codes


class ContactList extends React.Component {
    static contextType = DatabaseContext;

    constructor(props) {
        super(props);
        this.state = {
            contacts: 1,
        };
    }

    renderContacts() {
        return (
            <Contact/>
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
            return <div id="contactsList">{this.renderContacts()}

            </div>;
        }
    }
}

export default ContactList;
