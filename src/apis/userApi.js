import firebase from "../services/firebase";

export function createUserFromRef(docRef) {
	return {
		id: docRef.id,
		...docRef.data(),
	};
}

export function resetUser(user) {
	firebase.firestore().collection("userList").doc(user.id).update({
		deck: [],
		myTurn: false,
	});
}

export function nextUser(users, me) {
	let myIndex = users.findIndex((i) => i.id === me.id);
	let nextIndex = myIndex === users.length - 1 ? 0 : (myIndex += 1);
	let nextUser = users[nextIndex];

	firebase.firestore().collection("userList").doc(nextUser.id).update({
		myTurn: true,
	});
}

export function removeCardsFromDeck(cards, user) {
	cards.map((card, index) => {
		let deckWithCardRemoved = user.deck.filter((a) => {
			return a.class != card.class;
		});
		user.deck = deckWithCardRemoved;
		if (index === cards.length - 1) {
			firebase.firestore().collection("userList").doc(user.id).update({
				deck: user.deck,
				myTurn: false,
			});
		}
	});
}

export function createUser(id) {
	firebase
		.firestore()
		.collection("userList")
		.doc(id)
		.set({
			wins: 0,
			deck: [],
		})
		.then((docRef) => {
			localStorage.setItem("username", id);
			window.location.reload();
		})
		.catch((error) => {
			debugger;
		});
}

export function getMe() {
	//get username from storage
	let username = localStorage.getItem("username");
	if (username) {
		//if the usename exists, get the firebase doc
		var docRef = firebase.firestore().collection("userList").doc(username);
		docRef.get().then((doc) => {
			//if the firebase doc exists, return the user
			if (doc) {
				return createUserFromRef(doc);
			}
			//if the firebase doc doesn't exist, delete the storage
			else {
				localStorage.removeItem("username");
			}
		});
	}
	//return null if the user isn't in firebase
	return {};
}
