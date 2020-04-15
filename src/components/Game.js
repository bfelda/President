import React, { useState, useEffect } from "react";
import * as deckApi from "../services/deckService";
import * as gameApi from "../apis/gameApi";
import { db } from "../services/firebase";

export default function Game(props) {
	const [running, setRunning] = useState(false);

	return (
		<div className="absolute h-screen w-screen">
			<div className="flex md:flex-row flex-col justify-around ">
				{props.users.map((user) => (
					<div
						className={`bg-white my-2 p-3 shadow ${
							user.myTurn ? "bg-green-100 font-bold" : ""
						}`}
						key={user.id}
					>
						{user.id}: {user.deck.length} cards
					</div>
				))}
			</div>
			<div>
				{props.game.activeDeck.map((card) => (
					<div
						key={card.index}
						className={`card ${card.class}`}
					></div>
				))}
			</div>
		</div>
	);
}
