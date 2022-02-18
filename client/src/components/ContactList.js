import React from "react";
import Contact from "./Contact";
import DatabaseContext from "./databaseContext";
import uniqid from "uniqid";
import dropDownArrow from "../images/dropdownArrow.svg";

function isMobile() {
    return window.innerWidth < 1400;
}

class ContactList extends React.Component {
    static contextType = DatabaseContext;

    constructor(props) {
        super(props);
        this.state = {
            contacts: null,
            adding: false,
            users: null,
            searchValue: null,
            toggleList: false,
            isMobile: false,
        };
    }

    componentDidMount() {
        this.getContacts();
        this.getUsers();

        if (isMobile()) {
            this.setState({
                isMobile: true,
            })
        }

        window.addEventListener('resize', () => {
            if (isMobile()) this.setState({
                isMobile: true,
            })
            else{
                this.setState({
                    isMobile: false,
                })
            }
        });
    }

    componentWillUnmount() {
        this.getContactsQuery();
        this.getUsersQuery();
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
    };

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
    };

    setStateAdding = () => {
        this.setState({
            adding: !this.state.adding,
        });
    };

    renderContacts() {
        let contactsToRender = [];
        this.state.adding
            ? (contactsToRender = this.state.users)
            : (contactsToRender = this.state.contacts);

        return contactsToRender.map((contact) => {
            if (contact.uid === this.context.uid) return null;

            if (this.state.searchValue !== null) {
                if (!contact.name.includes(this.state.searchValue)) return null;
            }

            return (
                <Contact
                    key={uniqid()}
                    adding={this.state.adding}
                    contactData={contact}
                    currentContact={this.props.currentContact}
                    toggleList={this.toggleList}
                />
            );
        });
    }

    toggleList = () => {
        this.setState({
            toggleList: !this.state.toggleList,
        });
    };

    renderMobileList = () => {
        let contactHeader = this.props.currentContact.currentContactName;
        if (contactHeader === null) contactHeader = "No Contact";

        if (isMobile()) {
            let contacts = null;

            if (this.state.toggleList) contacts = this.renderContacts();

            return (
                <div id="receiver--mobile">
                    <div className="receiver--background receiverBackground--mobile">
                        <div id="receiver__header">
                            <p>{contactHeader}</p>
                            <img
                                src={dropDownArrow}
                                id="dropDown"
                                alt="drop down"
                                onClick={this.toggleList}
                            />
                        </div>
                        <div id="contactsFlex">
                            {contacts}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div id="receiver">
                    <div className="receiver--background">
                        <p>{contactHeader}</p>
                    </div>
                </div>
            );
        }
    };

    render() {
        let contactList;

        if (this.props.mobile) {
            return this.renderMobileList();
        }

        if (this.state.contacts !== null) {
            contactList = <div id="contactsList">{this.renderContacts()}</div>;
        } else {
            contactList = (
                <div id="contactsList">
                    <p id="noContacts">No Contacts</p>
                </div>
            );
        }

        return (
            <div id="contacts">
                <div id="buttonBar">
                    <input
                        type="search"
                        id="searchBar"
                        placeholder="Search ..."
                        onChange={(e) => {
                            this.setState({
                                searchValue: e.target.value,
                            });
                        }}
                    />

                    <button
                        id="addButton"
                        className="buttons"
                        onClick={this.setStateAdding}
                    >
                        Add
                    </button>
                </div>
                {contactList}
            </div>
        );
    }
}

export default ContactList;
