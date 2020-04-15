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

export function nextUser(users, me, game) {
	let allUsers = [...users, me];
	let orderedUserList = allUsers.sort((a, b) => a.winOrder - b.winOrder);
	let myIndex = orderedUserList.findIndex((i) => i.id === me.id);
	let nextIndex;
	if (game.clockwise) {
		nextIndex = myIndex === orderedUserList.length - 1 ? 0 : (myIndex += 1);
	} else {
		nextIndex = myIndex === 0 ? orderedUserList.length - 1 : (myIndex -= 1);
	}
	let nextUser = orderedUserList[nextIndex];

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
	console.log(id);
	firebase
		.firestore()
		.collection("userList")
		.doc(id)
		.set({
			winOrder: 0,
			created: Date.now(),
			wins: 0,
			deck: [],
		})
		.then((docRef) => {
			localStorage.setItem("username", id);
			window.location.reload();
		})
		.catch((error) => {
			console.log(error);
		});
}
