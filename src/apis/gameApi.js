import firebase from "../services/firebase";
import * as deckApi from "../services/deckService";

const gameId = "jfZbXjCYykHsLuZxgjZ3";

export function startGame(users) {
	let newUsers = users
		.filter((user) => user.winOrder === 0)
		.sort((a, b) => a.created - b.created);

	let existingUsers = users.filter((user) => user.winOrder !== 0);

	if (newUsers.length > 0) {
		newUsers.map(
			(user, index) =>
				(user.winOrder = existingUsers.length + (index + 1))
		);
	}
	let allUsers = [...existingUsers, ...newUsers].sort(
		(a, b) => a.winOrder - b.winOrder
	);
	firebase.firestore().collection("gameList").doc(gameId).update({
		running: true,
	});
	deckApi.getFullDeck().then((deck) => {
		deckApi.shuffleDeck(deck).then((shuffledDeck) => {
			deckApi
				.dealCardsToUsers(allUsers, shuffledDeck)
				.then((usersWithCards) => {
					usersWithCards.map((userWithCards, index) => {
						firebase
							.firestore()
							.collection("userList")
							.doc(userWithCards.id)
							.update({
								deck: userWithCards.deck,
								myTurn:
									userWithCards.winOrder === 1 ? true : false,
								winOrder: userWithCards.winOrder,
								observer: false,
							});
					});
				});
		});
	});
}

export function resetGame() {
	firebase.firestore().collection("gameList").doc(gameId).update({
		activeDeck: [],
		discardedDeck: [],
		running: false,
		clockwise: true,
	});
}

export function clearGameField(game) {
	firebase.firestore().collection("gameList").doc(gameId).update({
		activeDeck: [],
		discardedDeck: game.activeDeck,
	});
}

export function addCardsToGame(game, newCards, reverse) {
	let turn = {
		cards: newCards,
	};
	return firebase
		.firestore()
		.collection("gameList")
		.doc(gameId)
		.update({
			activeDeck: [...game.activeDeck, turn],
			clockwise: reverse ? !game.clockwise : game.clockwise,
		});
	//add code to go to the next user here
}

export function getGame() {
	let docRef = firebase.firestore().collection("gameList").doc(gameId);
}
