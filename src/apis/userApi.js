import firebase from "../services/firebase";
import * as chatApi from "./chatApi";

const repo = "userList";

export function resetUser(user) {
	firebase.firestore().collection(repo).doc(user.id).update({
		deck: [],
		myTurn: false,
		observer: true,
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

export function pass(users, me, clockwise) {
	nextUser(users, me, clockwise, false);
	firebase.firestore().collection(repo).doc(me.id).update({
		myTurn: false,
	});
}

export function endGame(order, lastUser) {
	firebase.firestore().collection(repo).doc(lastUser.id).update({
		myTurn: false,
		observer: true,
		winOrder: order,
	});
	chatApi.deleteAllChats();
}

export function nextUser(users, me, clockwise, skipped, complete) {
	let usersInPlay = users.filter((user) => user.observer !== true);
	if (usersInPlay.length === 1 && complete) {
		endGame(users.length + 1, usersInPlay[0]);
	} else {
		let allUsers = [...usersInPlay, me];
		let nextUserFn = clockwise
			? nextClockwiseUser
			: nextCounterClockwiseUser;
		let nextUser = nextUserFn(allUsers, me);
		if (skipped) nextUser = nextUserFn(allUsers, nextUser);
		firebase.firestore().collection(repo).doc(nextUser.id).update({
			myTurn: true,
		});
	}
}

export function removeCardsFromDeck(cards, user, clear, complete, users) {
	let usersLeft, winOrder, winner;
	if (complete) {
		usersLeft = users.filter((user) => user.observer === false);
		winOrder = users.length + 1 - usersLeft.length;
		winner = winOrder === 1;
	} else {
		winOrder = user.winOrder;
	}
	cards.map((card, index) => {
		let deckWithCardRemoved = user.deck.filter((a) => {
			return a.class != card.class;
		});
		user.deck = deckWithCardRemoved;
		if (index === cards.length - 1) {
			return firebase
				.firestore()
				.collection(repo)
				.doc(user.id)
				.update({
					deck: user.deck,
					myTurn: clear ? true : false,
					winOrder: winOrder,
					observer: complete,
					wins: winner ? (user.wins += 1) : user.wins,
				});
		}
	});
}

export function createUser(id) {
	firebase
		.firestore()
		.collection(repo)
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

export function removeUser(me, users) {
	let myWinOrder = me.winOrder;
	if (myWinOrder > 0) {
		users.map((user) => {
			if (user.winOrder > myWinOrder) {
				user.winOrder -= 1;
				firebase.firestore().collection(repo).doc(user.id).update({
					winOrder: user.winOrder,
				});
			}
		});
	}
	firebase.firestore().collection(repo).doc(me.id).delete();
}
