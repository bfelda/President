import React, { useState, useEffect } from "react";
import * as deckApi from "../stores/deckObj";
import { db } from "../services/firebase";

export default function Game(props) {
	const [deck, setDeck] = useState(deckApi.getFullDeck());
	return (
		<div className="absolute h-screen w-screen">
			<h1 className="text-white">
				{props.username}: {deck.length}
			</h1>
			{deck.map((card) => (
				<div key={card.index} className={`card ${card.class}`}></div>
			))}
		</div>
	);
}
