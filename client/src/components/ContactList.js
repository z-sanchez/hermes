import React from "react";


class ContactList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: null,
        };
    }

    render() {
        return (
            <div id="contactsList">
                <p id="noContacts">No Contacts</p>
            </div>
        );
    }
}

export default ContactList;