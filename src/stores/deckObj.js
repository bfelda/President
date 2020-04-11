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

function populateDeck(deckArray) {
	console.log("runnning deck__________________________");
	let current_suit_index = 0;

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
		});
	}
	for (let i = deckArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[deckArray[i], deckArray[j]] = [deckArray[j], deckArray[i]];
	}
}

function shuffleDeck(deck) {}

export function deal(players) {
	let playerNum = 3;
	let newDeck = getFullDeck();
	let shuffled = shuffleDeck(newDeck);
}

export function getFullDeck() {
	let deck = [];
	populateDeck(deck);
	return deck.slice(0, 17);
}
