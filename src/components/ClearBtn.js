import React from "react";
import * as gameApi from "../apis/gameApi";
import * as chatApi from "../apis/chatApi";

export default function ClearBtn(props) {
	function clear() {
		gameApi.clearGameField(props.game);
		chatApi.addBotChat(`${props.me.id} Cleared 🐷`);
	}

	return (
		<>
			{props.game.activeDeck.length > 0 &&
				props.game.activeDeck[props.game.activeDeck.length - 1].cards[0]
					.number === 2 &&
				props.me.myTurn && (
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
