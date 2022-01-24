Colors:

Background White #E3E3E3
Background Black #282D34
Text Bar Background Black #3C434B
Contact Box Background Black #393D43
 
Main Black #151C24
Main Purple #9430EB

Text White #E3E3E3
Text Black #2E2E2E
Light Text Black #5B5B5B




Fonts:

Arista Pro Trial Bold (Logo)
Open Sans 




DOM Tree idea for code

Login Page:

Main
   - Background
   - contentWrapper (flex) (class??)
	- hermesLogo (h1) (class)
	- loginForm (flex) (id) (form)
		- loginForm__title (id) (h1)
		- loginForm__signUp (id) (p)
		- loginForm__field (flex)(class)(div)
			- field__text (class) (h1)
			- field__enterInfo (class) (textfield)
		- loginForm__field (flex)
			- field__text 
			- field__enterInfo 
		- loginForm__rememeberMe (id) (div)
			- rememeberMe__checkbox (id) (checkbox)
			- rememeberMe__text (id) (p)
		- loginForm__loginButton (id)(button)


React Components:

  content:
	<html>
	loginForm
 		- checkEmail
			- utlize backend function to search database if found return true
 		- checkPassword
			- utlize backend function to search database if found return true
 		- rememberUser
			- (research)
 		- login
			- if checkEmail and checkPassword return true route to next page (further research for best way to route)
			- if checkEmail fails, notify user
			- if checkPassword fails, notify user



Server Functions:
	inDatabase (location, value): returns true if value is in location, false otherwise
	makeUserTables: contactTable, loginInfoTable, messageTable













Chat LoginForm: 
    - appGrid
	- header (flex) (header) (id)
		- header__logo (h1) (id) (use hermesLogo class too)
		- header__clock (p) (id)
	- contacts (flex) (aside) (id)
		- contacts__searchBar (textfield) (id)
		- create textBar style class for reuse in chat window
		- contacts__contact (class) (div) (flex)
			- contact__photo (img) (class)
			- contact__text (div) (class) (flex)
				- contact__name (class) (p)
				- contact__text
			- contacts__contact--styling (class)
			- contacts__contactNotification--styling (class)
	- utilityButtons
		- utilityButton (class) (button)
		- utilityButton__find--style
		- utilityButton__edit--style
	- chatWindow (flex) (id) (content??)
		- chatWindow--styling
		- chatWindow__header (flex) (id) (header???)
			- chatWindow__headerName (h1)
			- chatWindow__image or contact__photo (img) (class)
		- chatWindow__messages (div) (id) 
			- messages__userMessage
			- messages__userMessage--lastSent
			- messages__contactMessage
			- messages__contactMessage--lastSent
		- chatWindow__sendMessagebar (div) (flex) (class)
			- sendMessageBar (textfield)
				- textBar class
			- utilityButton__send


React Components:

//currentUserID = the currently logged in user
//listUpdated (context) = bool saying wheether the contact list has new additions or not (if so, contact list must be re-rendered)
//contact (context) = the user who is currently being chatted with, if none null (object: id, convoCode)
//contactList = listOfContacts scraped off users data table
//convoCode = unqique code which is the name of the location of messages between two people in the database
//windowTrue = wheteher or not window should be rendered

  content: (state: currentUserID, listUpdated (context bool), contact)
	header
 		- <html>
		- clock 
			- function component, tell time using timer simple (look up)

	contacts (state: contactList, listUpdated (bool))

	contacts should be objects (userID, convoCode)

		- getContacts on mount: call get userContacts from server and put objects into state
 		- search (state: contactList) (MAYBE FIND A LIBRARY)
			- onChange: filter list based on search, call renderList
			- renderList: pass list to parent component "contacts"
		- contactList component (state: contactList)
			- render: fill flexBox with contacts
				- contacts on click should update context contact



	utilityButtons
		- Find (state: windowTrue (bool))
			- onClick: pull up window
			- window: return window html, onClickAway function -> get rid of window (research)
			- render: conditional rendering to display window or not
				- FindWindow (state: foundUsers array, windowTrue (passed down))
					- search: 
						- onChange: searchUsers call from server, add to foundUsers
						- render: users found display, if clicked addUserToContactList and change context
							listUpdated to true and windowTrue to false
 
	chatWindow (state: contact, messages, convoCode)
		- <html>
		- onMount: get contact convoCode from props and update state, grab last 20 of messages with grabMessages and put into objects (message, from, to, convoCode) in state, find convocode from user table
		- sendMessage: if first, makeConvoCode then sendMessage, otherwise sendMessage, always add to state so it can render
		- receeiveMessage: ??, add to state
		- render: 
			- implement scroll, when reach the top grab 20 more messages
			- recievedMessage (function components, render last sent)
			- sentMessage (function components, render last sent)
		
	


Server Functions:
//userID = the currently logged in user
//addingUserID = user id to be added to current users contact list
//convoCode = unique number that identfies the table name which holds the messages between two users


	getContacts (userID): find table userID and return every contact from the table
	searchUsers (userID): search users table and return userID
	addUserToContactList (userID, addingUserID): add addindUserID to userID contact table
	makeConvoCode: generate new convoCode and add to both users contact list as convoCode
	findConvoCode: search current users contact table to find convo with others and return convoCode, if none return false
	getMessages (convoCode): return last 20 messages from conversaition between ids
	sendMessage (convoCode): add message to message table
	




Questions: 

How should html tags be used on some of the DOM proposed elements?
How to do a remember me?
React Routing to other pages
Library for scroll bar
SearchBar library???
Real time message updates?? library??




Future implementations: 
Sign up page
Send email when sign up
Edit contacts button
Edit messages button