import React, { useState } from "react";
import Chat from "../components/Chat";
import Turn from "./Turn";
import * as gameApi from "../apis/gameApi";
import * as userApi from "../apis/userApi";

export default function Game(props) {
	function resetGame() {
		gameApi.resetGame();
		let allUsers = [...props.users, props.me];
		allUsers.map((user) => {
			userApi.resetUser(user);
		});
	}

	return (
		<div className="flex-grow relative">
			<Chat messages={props.messages} me={props.me} />
			<div className="flex flex-row justify-around">
				{props.users.map((user) => (
					<div
						className={`${
							user.observer ? "bg-white" : "bg-orange-200"
						} shadow rounded-b-lg p-3 shadow ${
							user.myTurn
								? "font-bold shadow-md border-b-4 border-l-4 border-r-4 border-green-500"
								: ""
						}`}
						key={user.id}
					>
						{user.id}{" "}
						{!user.observer && user.winOrder === 1 && "👑"}
						{!user.observer &&
							user.winOrder === props.users.length &&
							"💩"}
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
							className=" ml-2 bg-red-400 text-white text-xl rounded shadow-md px-8 py-4 absolute z-10"
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
							<Turn cards={turn.cards} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
