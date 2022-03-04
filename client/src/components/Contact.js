import React, {useContext} from "react";
import {useEffect} from 'react';
import DatabaseContext from "./databaseContext";
import {doc, getDoc, setDoc} from "firebase/firestore";

function isMobile() { //outsource this
    return window.innerWidth < 1400;
}

const Contact = (props) => {
    const context = useContext(DatabaseContext);

    //use effect
    useEffect(() => {
        document.getElementById(
            props.contactData.uid
        ).style.backgroundImage = `url( ${props.contactData.profilePic})`;
    });

    //updates current contact in ChatApp.js
    function updateCurrentContact() {
        props.currentContact.updateContact(
            props.contactData.uid,
            props.contactData.name
        );

        if (isMobile()) props.toggleList(); //make mobile dropdown contactlist vanish once contact selected
    }

    //same process as in LoginFrom.js for entering new user. Move function elsewhere
    async function addContact() {
        const collection = doc(
            context.database,
            context.uid,
            props.contactData.uid
        );

        const document = await getDoc(collection);

        if (!document.exists()) {
            await setDoc(collection, {
                name: props.contactData.name,
                profilePic:
                    "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                uid: props.contactData.uid,
            });
        }
    }


    //ui colors and styling specifics.
    let activeBarLit = 'contact__activeBar', active = 'contact';

    if (
        props.currentContact.currentContact === props.contactData.uid
    ) {
        activeBarLit = 'contact__activeBar--lit';
        active = 'contact contact--active';
    } else if (props.adding === true) {
        activeBarLit = 'contact__activeBar--red';
        if (props.added) activeBarLit = 'contact__activeBar--green';
    }


    return (
        <div className={active} onClick={() => {
            if (props.adding === true) addContact(); else updateCurrentContact();
        }}>
            <div className={activeBarLit}/>
            <div
                className="contactImage--border"
                id={props.contactData.uid}
            />
            <div className="contact__text">
                <h1>{props.contactData.name}</h1>
            </div>
        </div>
    );


}


export default Contact;