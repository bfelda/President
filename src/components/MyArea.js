import React, { useState, useEffect } from "react";
import Card from "./Card";
import * as gameApi from "../apis/gameApi";
import * as userApi from "../apis/userApi";

export default function MyArea(props) {
	const [selectedCards, setSelectedCards] = useState([]);
	const [deck, setDeck] = useState([]);

	useEffect(() => {
		let twos = props.me.deck.filter((card) => card.number === 2);
		let fours = props.me.deck.filter((card) => card.number === 4);
		let deckWithoutTwosFours = props.me.deck.filter(
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
		setDeck(orderedDeck);
	}, [props.me.deck]);

	function onClick(card, selected) {
		if (props.me.myTurn) {
			if (selected) {
				setSelectedCards([...selectedCards, card]);
			} else {
				let newDeck = selectedCards.filter((a) => {
					return a.class != card.class;
				});
				setSelectedCards(newDeck);
			}
		}
	}

	function sortDeck(deck) {
		return deck.sort((a, b) => a.number - b.number);
	}

	function skippedCheck(deck, thrown) {
		let topNumbersOfDeck = deck[deck.length - 1].cards.map((c) => c.number);

		let currentNumbersThrown = thrown.map((c) => c.number);

		return (
			JSON.stringify(currentNumbersThrown) ==
			JSON.stringify(topNumbersOfDeck)
		);
	}

	function go() {
		let skipped = false;
		let reverse = selectedCards[0].number === 4;
		let clear = selectedCards[0].number === 2;
		let complete = props.me.deck.length === selectedCards.length;
		if (props.game.activeDeck.length > 0 && !reverse) {
			skipped = skippedCheck(props.game.activeDeck, selectedCards);
		}
		userApi.removeCardsFromDeck(
			selectedCards,
			props.me,
			clear,
			complete,
			props.users
		);
		gameApi.addCardsToGame(props.game, selectedCards, reverse).then(() => {
			if (!clear) {
				let clockwise = reverse
					? !props.game.clockwise
					: props.game.clockwise;
				userApi.nextUser(
					props.users,
					props.me,
					clockwise,
					skipped,
					complete
				);
			}
			setSelectedCards([]);
		});
	}

	function clear() {
		gameApi.clearGameField(props.game);
	}

	function pass() {
		userApi.pass(props.users, props.me, props.game.clockwise);
	}

	return (
		<div className="w-full bg-orange-200 relative">
			{!props.me.myTurn && (
				<div className="absolute w-full h-full z-10 bg-white opacity-50"></div>
			)}
			<div className="flex flex-row justify-between p-5">
				<div className="flex">
					<div>
						<h1 className="text-green-600 text-2xl font-bold">
							{props.me.id}
						</h1>
						<span>{props.me.myTurn ? "Your Turn!" : ""}</span>
						<span>
							{props.me.observer &&
								"Position: " + props.me.winOrder}
						</span>
					</div>
					<button
						onClick={go}
						disabled={selectedCards.length === 0}
						className=" ml-2 bg-green-700 text-white text-xl rounded shadow px-8 disabled:opacity-75"
					>
						Go
					</button>
					<button
						onClick={pass}
						className=" ml-2 bg-orange-400 rounded shadow px-4 disabled:opacity-75"
					>
						Pass
					</button>
				</div>
				<div>
					{props.game.activeDeck.length > 0 &&
						props.game.activeDeck[props.game.activeDeck.length - 1]
							.cards[0].number === 2 &&
						props.me.myTurn && (
							<button
								onClick={clear}
								className=" ml-2 bg-red-400 text-white rounded shadow px-4 disabled:opacity-75 h-full"
							>
								Clear
							</button>
						)}
				</div>
			</div>
			<div className="mt-5 py-2 px-10 my-deck">
				{deck.map((card) => (
					<Card onClick={onClick} key={card.index} card={card} />
				))}
			</div>
		</div>
	);
}
