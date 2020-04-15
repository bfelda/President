import firebase from "../services/firebase";
import * as deckApi from "../services/deckService";

const gameId = "jfZbXjCYykHsLuZxgjZ3";

export function startGame(users) {
	if (users[0].winOrder === 0) {
		users.sort((a, b) => a.created - b.created);
		users.map((user, index) => {
			user.winOrder = index + 1;
		});
	} else {
		users.sort((a, b) => a.winOrder - b.winOrder);
	}
	firebase.firestore().collection("gameList").doc(gameId).update({
		running: true,
	});
	deckApi.getFullDeck().then((deck) => {
		deckApi.shuffleDeck(deck).then((shuffledDeck) => {
			deckApi
				.dealCardsToUsers(users, shuffledDeck)
				.then((usersWithCards) => {
					usersWithCards.map((userWithCards, index) => {
						firebase
							.firestore()
							.collection("userList")
							.doc(userWithCards.id)
							.update({
								deck: userWithCards.deck,
								myTurn: index === 0 ? true : false,
								winOrder: userWithCards.winOrder,
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
