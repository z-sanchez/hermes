import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {doc, getDoc, setDoc} from "firebase/firestore";

// Initialize Firebase
export function startApp() {
    firebase.initializeApp({
        apiKey: "AIzaSyDOPMnkeXZQ_QZRsU-0gK3clikC6i8btZE",
        authDomain: "hermes-34df3.firebaseapp.com",
        projectId: "hermes-34df3",
        storageBucket: "hermes-34df3.appspot.com",
        messagingSenderId: "19858880682",
        appId: "1:19858880682:web:ac908d6516a297dc58f8d3",
        measurementId: "G-3BQ9HJQMLE",
    });
}

export function getUser() {
    return firebase.auth.currentUser;
}

export function seeAuthState() {
    return firebase.auth();
}

//signing into firebase with demo credentials
export async function signInWithEmail() {
    firebase.auth().signInWithEmailAndPassword('demo@gmail.com', 'demo123')
        .catch(function (error) {
            console.log(error);
        });
}

export async function signOut() {
    try {
        await firebase.auth().signOut();
    } catch (error) {
        console.log(error.message);
    }
}

export function getDatabase() {
    return firebase.firestore();
}

export function getFirebase() {
    return firebase;
}

export function enterUserToDatabase(collectionName, uid, email) {
    const docRef = doc(getDatabase(), collectionName, uid);

    async function docSnap() {
        const doc = await getDoc(docRef);
        if (!doc.exists()) {
            //if user does not exist in database, add them in
            await setDoc(docRef, {
                name: email,
                profilePic:
                    "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                uid: uid,
            });
        }
    }

    docSnap();
}

export function getAllChatMessages(collectionName) {
    return getDatabase().collection(collectionName);
}

export function getConversationID(user, contact) { //serializing id code algorithm
    let user1 = false,
        user2 = false,
        char = 0,
        uid1 = user,
        uid2 = contact;

    while (user1 === false && user2 === false) {
        if (uid1[char] === uid2[char]) ++char;
        else if (uid1[char] > uid2[char]) user1 = true;
        else user2 = true;
    }

    return user1 ? uid1.concat(uid2) : uid2.concat(uid1);
}

export function isMobile() {
    //certain features need to know if mobile is active
    return window.innerWidth < 1400;
}