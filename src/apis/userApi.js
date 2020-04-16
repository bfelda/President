import firebase from "../services/firebase";

export function resetUser(user) {
	firebase.firestore().collection("userList").doc(user.id).update({
		deck: [],
		myTurn: false,
	});
}

function sortedUserList(users) {
	return users.sort((a, b) => a.winOrder - b.winOrder);
}

function currentUserIndex(users, user) {
	return users.findIndex((i) => i.id === user.id);
}

function nextClockwiseUser(users, currentUser) {
	let orderedUserList = sortedUserList(users);
	let myIndex = currentUserIndex(orderedUserList, currentUser);
	let nextUserIndex =
		myIndex === orderedUserList.length - 1 ? 0 : (myIndex += 1);
	return users[nextUserIndex];
}

function nextCounterClockwiseUser(users, currentUser) {
	let orderedUserList = sortedUserList(users);
	let myIndex = currentUserIndex(orderedUserList, currentUser);
	let nextUserIndex =
		myIndex === 0 ? orderedUserList.length - 1 : (myIndex -= 1);
	return users[nextUserIndex];
}

export function nextUser(users, me, clockwise, skipped) {
	console.log("skipped: ", skipped);
	console.log("clockwise: ", clockwise);

	let allUsers = [...users, me];
	let nextUserFn = clockwise ? nextClockwiseUser : nextCounterClockwiseUser;
	let nextUser = nextUserFn(allUsers, me);
	if (skipped) nextUser = nextUserFn(allUsers, nextUser);
	console.log(me.id, nextUser.id);
	firebase.firestore().collection("userList").doc(nextUser.id).update({
		myTurn: true,
	});
}

export function removeCardsFromDeck(cards, user, clear) {
	cards.map((card, index) => {
		let deckWithCardRemoved = user.deck.filter((a) => {
			return a.class != card.class;
		});
		user.deck = deckWithCardRemoved;
		if (index === cards.length - 1) {
			firebase
				.firestore()
				.collection("userList")
				.doc(user.id)
				.update({
					deck: user.deck,
					myTurn: clear ? true : false,
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
			winOrder: 0,
			created: Date.now(),
			wins: 0,
			deck: [],
			observer: true,
		})
		.then((docRef) => {
			localStorage.setItem("username", id);
			window.location.reload();
		})
		.catch((error) => {
			console.log(error);
		});
}
