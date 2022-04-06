
# HERMES
A React Chat App

 ![Login Screen](/client/src/images/screenshot.png)

### live site (https://xenodochial-saha-fcec11.netlify.app/)

# Table of Contents
1. [About](#whatitdoes)
2. [Tools, API's, and more](#tools)
3. [Setup](#setup)
4. [How it works](#howit)
5. [What I learned](#learned)
6. [What's to come?](#whattocome)

## About <a name="whatitdoes"></a>
After several back to back small React projects, I wanted to do something out of my comfort zone.
I saw some chat app ideas on youtube and gave it my shot. 

This project was benificial to my learning of in depth react and javascript. I also got to play around with Google's Firebase.

## Tools, API's, and more <a name="tools"></a>
### Firebase
During this project I spent a lot of time with the firebase documentation. I now how a feel for subscribing to api's, being organized about api calls,
asynchronous tasks, and authentication. 

The main functions of firebase in this project are to authenticate a user, create collections with users id, add their id to a manifest, retrieve and store chat messages.

The firestore for hermes is mainly composed of three different collection types: 
- users (the manifest of all users on the app)
- user (contains all of the users contacts)
- chat (user and contacts chat messages)

### SASS
I also used SASS again and went through documentation. I was feeling good about it until I then realized I nested every style declaration.
All my styling was out of sorts.

I'll never make that mistake again.

Others: React

## Setup <a name="setup"></a>
If you want to run the project yourself, clone the repository, go into client folder and run 
<code>npm install</code> and then <code>npm start</code>

You'll be greeted to a demo version of the app.

On mobile, click the no contact to choose who to chat with. 

Click logo to sign out.

## How it works <a name="howit"></a>
Login with google.

*The ChatApp* component is the main parent of all data and also displays messages. When mounted it grabs messages, sets a current contact, and grabs messages from the chat
between user and that contact. The default is no contact selected.

*The ContactList* component has the job of displaying contacts, adding contacts, and passing on contact info to *Contact* component. On mobile devices,
this has the be rendered differently due to a second list component being render in visible spot on the page. This happens because in mobile, the main list is cut off.

*Contact*
Function component that renders contacts. 


## What I learned <a name="learned"></a>
- Don't nest styles in sass unless you mean to 
- Try not to set height properties on elements. It makes responsiveness a pain.
- Keep organized and write clean code now instead of later
- Read documentation and write documentation
- Firebase
- I can host sites on netlify
- React context
- More familiar with React useState, useEffect


## What's to come <a name="whattocome"></a>
- getting rid of mobile dependent functions. These are nasty for the code. I can just
handle issues with plain css
- code refactoring
- better css styling
- deleting contacts, messages
