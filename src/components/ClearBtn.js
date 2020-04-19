import React from "react";
import * as gameApi from "../apis/gameApi";
import * as chatApi from "../apis/chatApi";

export default function ClearBtn(props) {
	function clear() {
		gameApi.clearGameField(props.game);
		chatApi.addBotChat(`Wipe it 🧻🧻`);
	}

	function showClearBtn() {
		let topTurn = props.game.activeDeck[props.game.activeDeck.length - 1];
		if (!topTurn) return false;
		let topCardIsTwo =
			props.game.activeDeck.length > 0 && topTurn.cards[0].number === 2;

		let allPassed = topTurn.userId === props.me.id;
		let myTurn = props.me.myTurn;
		return (topCardIsTwo || allPassed) && myTurn;
	}

	return (
		<>
			{showClearBtn() && (
				<button
					onClick={clear}
					className=" ml-2 bg-red-400 text-white rounded shadow px-4 disabled:opacity-75 h-full"
				>
					Clear
				</button>
			)}
		</>
	);
}
