import React, { useState } from "react";
import * as gameApi from "../apis/gameApi";
import * as userApi from "../apis/userApi";

export default function Game(props) {
	const [running, setRunning] = useState(false);

	function resetGame() {
		gameApi.resetGame();
		let allUsers = [...props.users, props.me];
		allUsers.map((user) => {
			userApi.resetUser(user);
		});
	}

	return (
		<div className="flex-grow">
			<div className="flex flex-row justify-around">
				{props.users.map((user) => (
					<div
						className={`${
							user.observer ? "bg-white" : "bg-orange-200"
						} shadow rounded-b-lg p-3 shadow ${
							user.myTurn ? "text-xl font-bold shadow-md" : ""
						}`}
						key={user.id}
					>
						{user.id}: {user.winOrder}
					</div>
				))}
			</div>
			<div className="flex items-center justify-center h-full">
				{/* Reset Button only visible at end of game */}
				{props.users.filter((user) => user.observer).length ===
					props.users.length &&
					props.game.running && (
						<button
							onClick={resetGame}
							className=" ml-2 bg-red-400 text-white text-xl rounded shadow px-8 py-4 disabled:opacity-75"
						>
							Reset
						</button>
					)}
				{/* Active Deck */}
				<div
					style={{
						marginTop:
							"-" +
							(props.game.activeDeck.length * 20 + 100) +
							"px",
					}}
				>
					{props.game.activeDeck.map((turn, index) => (
						<div
							key={index}
							style={{
								marginTop: index !== 0 ? 20 * index + "px" : "",
							}}
							className="p-2 turn absolute"
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
		</div>
	);
}
