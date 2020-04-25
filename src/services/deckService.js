import * as chatApi from "../apis/chatApi";

const suits = ["clubs", "hearts", "spades", "diamonds"];
const numberOfCards = 52;
const numbers = [
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"ten",
	"jack",
	"queen",
	"king",
	"ace",
];

export function dealCardsToUsers(users, shuffledDeck) {
	return new Promise((resolve, reject) => {
		let currentUserToDeal = 0;
		shuffledDeck.map((card, index) => {
			currentUserToDeal += 1;
			if (currentUserToDeal === users.length) {
				currentUserToDeal = 0;
			}
			users[currentUserToDeal].deck.push(card);

			if (index === numberOfCards - 1) {
				resolve(users);
			}
		});
	});
}

export function shuffleDeck(deckArr) {
	return new Promise((resolve, reject) => {
		//shuffle the deck
		for (let i = deckArr.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[deckArr[i], deckArr[j]] = [deckArr[j], deckArr[i]];
			if (i === 1) {
				resolve(deckArr);
			}
		}
	});
}

export function getFullDeck() {
	return new Promise((resolve, reject) => {
		let deckArray = [];
		let current_suit_index = 0;
		//build the deck
		while (current_suit_index < 4) {
			numbers.map((number, index) => {
				let card = {
					class: `${number}_${suits[current_suit_index]}`,
					number: index + 2,
					suite: suits[current_suit_index],
					index: (current_suit_index + 1) * numbers.length + index,
				};
				if (index === 12) {
					current_suit_index += 1;
				}
				deckArray.push(card);
				if (deckArray.length === 52) {
					resolve(deckArray);
				}
			});
		}
	});
}

export function sortMyDeck(deck) {
	let twos = deck.filter((card) => card.number === 2);
	let fours = deck.filter((card) => card.number === 4);
	let deckWithoutTwosFours = deck.filter(
		(card) => card.number !== 2 && card.number !== 4
	);

	let threes = deckWithoutTwosFours.filter((card) => card.number === 3);
	let fives = deckWithoutTwosFours.filter((card) => card.number === 5);
	let sixes = deckWithoutTwosFours.filter((card) => card.number === 6);
	let sevens = deckWithoutTwosFours.filter((card) => card.number === 7);
	let eights = deckWithoutTwosFours.filter((card) => card.number === 8);
	let nines = deckWithoutTwosFours.filter((card) => card.number === 9);
	let tens = deckWithoutTwosFours.filter((card) => card.number === 10);
	let jacks = deckWithoutTwosFours.filter((card) => card.number === 11);
	let queens = deckWithoutTwosFours.filter((card) => card.number === 12);
	let kings = deckWithoutTwosFours.filter((card) => card.number === 13);
	let aces = deckWithoutTwosFours.filter((card) => card.number === 14);
	let doubles = [];
	let tripples = [];
	let quads = [];
	let singles = [];
	let grouped = [
		threes,
		fives,
		sixes,
		sevens,
		eights,
		nines,
		tens,
		jacks,
		queens,
		kings,
		aces,
	];
	grouped.map((group) => {
		switch (group.length) {
			case 1:
				singles.push(...group);
				break;
			case 2:
				doubles.push(...group);
				break;
			case 3:
				tripples.push(...group);
				break;
			case 4:
				quads.push(...group);
		}
	});
	let orderedDeck = [
		...singles,
		...doubles,
		...tripples,
		...quads,
		...fours,
		...twos,
	];
	return orderedDeck;
}

export function lastTurn(deck) {
	return deck[deck.length - 1].cards.map((c) => c.number);
}

export function validTurn(deck, selectedCards, deckLength) {
	//start out checking for twos, can't end on a two
	let twos = selectedCards.filter((card) => card.number === 2);
	if (twos.length === deckLength) {
		//can't end on twos
		chatApi.addBotChat(`Can't end on a two, screwed 💩`);
		return false;
	}
	//if the deck is empty, any card can be thrown
	if (deck.length === 0) return true;
	let topTurn = lastTurn(deck); //[3,3]
	//if one card is thrown
	if (selectedCards.length === 1) {
		let card = selectedCards[0]; //{number: 2, class: 'two_hearts'}
		//you can throw a 2 or 4 on anything
		if (card.number === 2 || card.number === 4) {
			return true;
		} else if (topTurn.length > 1) {
			chatApi.addBotChat(`Can't throw a single on that 💩`);
			//can't throw a single on a double, triple, quad
			return false;
			//can't throw a lower card on a higher card
		} else if (topTurn[0] > card.number) {
			chatApi.addBotChat(`that don't beat it 💩`);
			return false;
		} else {
			return true;
		}
	} else if (selectedCards.length === 2) {
		//If Two Cards Thrown
		let card1 = selectedCards[0];
		let card2 = selectedCards[1];
		//make sure they match
		if (card1.number !== card2.number) {
			chatApi.addBotChat(`Gotta match 💩`);
			return false;
		} else if (card1.number === 2) {
			//can throw pair of 2s on anything
			return true;
		} else if (card1.number === 4) {
			//can't throw multiple fours at one time
			chatApi.addBotChat(`4's go one ata time 💩`);
			return false;
		} else if (topTurn.length > 2) {
			// can't throw two on 3
			chatApi.addBotChat(`Two few cards 💩`);
			return false;
		} else if (topTurn.length < 2) {
			return true;
		} else if (selectedCards[0].number < topTurn[0]) {
			//can't throw a lower pair
			chatApi.addBotChat(`That don't beat it 💩`);
			return false;
		} else {
			return true;
		}
	} else if (selectedCards.length === 3) {
		//If three cards thrown
		let card1 = selectedCards[0];
		let card2 = selectedCards[1];
		let card3 = selectedCards[2];
		//make sure they match
		if (card1.number !== card2.number || card2.number !== card3.number) {
			chatApi.addBotChat(`Gotta match 💩`);
			return false;
		} else if (card1.number === 2) {
			//twos are good for anything
			return true;
		} else if (card1.number === 4) {
			//can't throw more than one 4
			chatApi.addBotChat(`4's go one ata time 💩`);
			return false;
		} else if (topTurn.length > 3) {
			chatApi.addBotChat(`too few cards 💩`);
			// can't throw 3 cards on a 4 card turn
			return false;
		} else if (topTurn.length < 3) {
			return true;
		} else if (selectedCards[0].number < topTurn[0]) {
			chatApi.addBotChat(`That don't beat it 💩`);
			return false;
		} else {
			return true;
		}
	} else if (selectedCards.length === 4) {
		let card1 = selectedCards[0];
		let card2 = selectedCards[1];
		let card3 = selectedCards[2];
		let card4 = selectedCards[3];
		//make sure they match
		if (
			card1.number !== card2.number ||
			card2.number !== card3.number ||
			card3.number !== card4.number
		) {
			chatApi.addBotChat(`Gotta match 💩`);
			return false;
		} else if (card1.number === 2) {
			//twos are good for anything
			return true;
		} else if (card1.number === 4) {
			//can't throw more than one 4
			chatApi.addBotChat(`4's go one ata time 💩`);
			return false;
		} else if (topTurn.length < 4) {
			return true;
		} else if (selectedCards[0].number < topTurn[0]) {
			chatApi.addBotChat(`That don't beat it 💩`);
			return false;
		} else {
			return true;
		}
	}
	return true;
}
