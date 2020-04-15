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
		let iteration = 1;
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
					class: `${numbers[index]}_${suits[current_suit_index]}`,
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
