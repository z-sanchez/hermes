import React from "react";
import Contact from "./Contact";
import DatabaseContext from "./databaseContext";
import uniqid from "uniqid";
import {getDatabase} from "./serverFunctions";
import {isMobile} from "./serverFunctions";

class ContactList extends React.Component {
    static contextType = DatabaseContext;

    constructor(props) {
        super(props);
        this.state = {
            contacts: [], //the users added contacts
            adding: false,
            users: [], //unadded users
            searchValue: null,
            toggleList: false, //for mobile
            isMobile: false,
        };
    }

    componentDidMount() {
        //grabs user info and stores it in state
        this.getContacts();
        this.getUsers();

        //for mobile purposes.
        if (isMobile()) {
            this.setState({
                isMobile: true,
            });
        }

        window.addEventListener("resize", () => {
            if (isMobile())
                this.setState({
                    isMobile: true,
                });
            else {
                this.setState({
                    isMobile: false,
                });
            }
        });
    }

    componentWillUnmount() {
        //unsubscribe to list of contacts and unadded users
        this.getContactsQuery();
        this.getUsersQuery();
    }

    //next two functions are the same place code elsewhere
    getContacts = () => {
        //grabs all user contacts from database
        let contacts = getDatabase().collection(this.context.uid);
        this.getContactsQuery = contacts.onSnapshot((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            if (data) {
                this.setState({
                    contacts: data,
                });
            }
        });
    };

    getUsers = () => {
        //grabs all user contacts from database
        let contacts = getDatabase().collection("users");
        this.getUsersQuery = contacts.onSnapshot((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            if (data) {
                this.setState({
                    users: data,
                });
            }
        });
    };

    setStateAdding = (button) => {
        //ui and state changes for adding contacts
        button.style.backgroundColor = "#583E79";
        button.style.backgroundColor = "#9430EB";

        this.setState({
            adding: !this.state.adding,
        });
    };

    toggleList = () => {
        this.setState({
            toggleList: !this.state.toggleList,
        });
    };

    renderContacts() {
        let contactsToRender = [];
        this.state.adding
            ? (contactsToRender = this.state.users)
            : (contactsToRender = this.state.contacts);

        //if not adding contacts, if contacts are empty, if not on mobile
        if (this.state.adding === false && this.state.contacts.length === 0 && !isMobile()) {
            return (
                <div id="contactsList">
                    <p id="noContacts">No Contacts</p>
                </div>
            );
        }

        return contactsToRender.map((contact) => {
            if (contact.uid === this.context.uid) return null; //ignore user's info from database

            if (this.state.searchValue !== null) {
                //if searching
                if (!contact.name.includes(this.state.searchValue)) return null;
            }

            //finds if the user has been added
            const exist = (addedContact) => addedContact.id === contact.id;
            let added = this.state.contacts.some(exist);

            return (
                <Contact
                    key={uniqid()}
                    adding={this.state.adding} //important for ui
                    contactData={contact}
                    currentContact={this.props.currentContact}
                    toggleList={this.toggleList} //for mobile dropdown contact list
                    added={added}
                />
            );
        });
    }

    //mobile requires different rendering for dropdown menu (kind of like a navbar)
    renderMobileList = () => {
        //using data we got earlier in ChatApp.js, we can render a new receiver header. The old one displayed in desktop
        // view is part of a ChatApp's rendering and that ContactList didn't need a header.
        let contactHeader = this.props.currentContact.currentContactName;
        if (contactHeader === null) contactHeader = "No Contact";

        let contacts = [null]; //array of render components

        if (this.state.toggleList) {
            //if the list is toggled
            contacts[0] = (
                <div
                    className="contact addButtonMobile"
                    key={"123"}
                    onClick={() => {
                        this.setState({
                            adding: !this.state.adding,
                        });
                    }}
                >
                    <div className="contact__activeBar"/>
                    <div
                        className="contactImage--border"
                        id="UZYNS7h2X7QXHPeTNXV4NQbqqJ32"
                    />
                    <div className="contact__text">
                        <h1>{"Add"}</h1>
                    </div>
                </div>
            );
            contacts[1] = this.renderContacts();
        }

        //by the end an all-in-one receiver header, add contact interface, and contact list is rendered
        return (
            <div id="receiver">
                <div id="receiver__header">
                    <p onClick={this.toggleList}>{contactHeader}</p>
                    <div id="contactsFlex">{contacts}</div>
                </div>
            </div>
        );
    };

    render() {
        if (this.props.mobile) {
            return this.renderMobileList();
        }

        return (
            <div id="contacts">
                <div id="buttonBar">
                    <input
                        type="search"
                        id="searchBar"
                        autoComplete="off"
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
                        onClick={(button) => {
                            this.setStateAdding(button.target);
                        }}
                    >
                        Add
                    </button>
                </div>
                <div id="contactsList">{this.renderContacts()}</div>
            </div>
        );
    }
}

export default ContactList;
