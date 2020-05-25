import React from "react";
import * as gameApi from "../apis/gameApi";
import * as chatApi from "../apis/chatApi";
//Clear button needs to block everything so you cannot throw something on a two accidentally
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
				<div className="absolute bg-green-300 w-full h-full top-0 flex justify-center items-center">
					<button
						onClick={clear}
						className=" ml-2 bg-green-700 text-white rounded shadow px-20 py-8 text-2xl"
					>
						Clear
					</button>
				</div>
			)}
		</>
	);
}
