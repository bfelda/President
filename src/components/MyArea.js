import React, { useState, useEffect } from "react";
import Card from "./Card";
import * as gameApi from "../apis/gameApi";
import * as userApi from "../apis/userApi";

export default function MyArea(props) {
	const [selectedCards, setSelectedCards] = useState([]);

	function setupDeck() {
		sortDeck(props.me.deck);
	}

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

	function go() {
		gameApi.addCardsToGame(props.game, selectedCards, props.me);
		userApi.removeCardsFromDeck(selectedCards, props.me);
		userApi.nextUser(props.users, props.me, props.game);
		setSelectedCards([]);
	}

	function clear() {
		gameApi.clearGameField(props.game);
	}

	function resetGame() {
		gameApi.resetGame();
		let allUsers = [...props.users, props.me];
		allUsers.map((user) => {
			userApi.resetUser(user);
		});
	}

	setupDeck();

	return (
		<div className="absolute bottom-0 w-full bg-orange-200">
			{!props.me.myTurn && (
				<div className="absolute w-full h-full z-10 bg-white opacity-50"></div>
			)}
			<div className="flex flex-row p-5">
				<h1 className="text-green-600 text-2xl font-bold">
					{props.me.id}
				</h1>
				<button
					onClick={go}
					disabled={selectedCards.length === 0}
					className=" ml-2 bg-orange-400 rounded shadow px-4 disabled:opacity-75"
				>
					Go
				</button>
				<button
					onClick={clear}
					className=" ml-2 bg-red-400 rounded shadow px-4 disabled:opacity-75"
				>
					Clear
				</button>
				<button
					onClick={resetGame}
					className=" ml-2 bg-red-400 rounded shadow px-4 disabled:opacity-75"
				>
					Reset
				</button>
				<span>{props.me.myTurn ? "Your Turn!" : ""}</span>
			</div>
			<div className="mt-2 p-2">
				{props.me.deck.map((card) => (
					<Card onClick={onClick} key={card.index} card={card} />
				))}
			</div>
		</div>
	);
}
