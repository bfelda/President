import React, { useState, useEffect } from "react";
import * as deckApi from "../services/deckService";
import * as gameApi from "../apis/gameApi";
import { db } from "../services/firebase";

export default function Game(props) {
	const [running, setRunning] = useState(false);

	return (
		<div className="flex-grow">
			<div className="flex flex-row justify-around">
				{props.users.map((user) => (
					<div
						className={`bg-white p-3 shadow ${
							user.myTurn ? "bg-green-100 font-bold" : ""
						}`}
						key={user.id}
					>
						{user.id}
					</div>
				))}
			</div>
			<div className="flex items-center justify-center h-full">
				{props.game.activeDeck.map((turn, index) => (
					<div
						key={index}
						className="p-2 turn flex flex-row flex-wrap"
					>
						{turn.cards &&
							turn.cards.map((card) => (
								<div
									key={card.index}
									className={`card ${card.class}`}
								></div>
							))}
					</div>
				))}
			</div>
		</div>
	);
}
