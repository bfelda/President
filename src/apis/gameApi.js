import firebase from "../services/firebase";
import * as deckApi from "../services/deckService";
import * as userApi from "./userApi";

const gameId = "jfZbXjCYykHsLuZxgjZ3";

export function startGame(users) {
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

export function addCardsToGame(game, newCards, user) {
	let reverse = newCards[0].number === 4;
	firebase
		.firestore()
		.collection("gameList")
		.doc(gameId)
		.update({
			activeDeck: [...game.activeDeck, ...newCards],
			clockwise: reverse ? !game.clockwise : game.clockwise,
		});
}

export function getGame() {
	let docRef = firebase.firestore().collection("gameList").doc(gameId);
}
