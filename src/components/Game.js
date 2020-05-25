import React, { useState } from "react";
import Chat from "./Chat";
import WinOrder from "./WinOrder";
import EndGame from "./EndGame";
import Turn from "./Turn";

export default function Game(props) {
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
						<span>{user.id}</span>
						<WinOrder me={user} users={props.users} />
					</div>
				))}
			</div>
			<div className="flex items-center justify-center h-full">
				{/* Reset Button only visible at end of game */}
				{props.users.filter((user) => user.observer).length ===
					props.users.length &&
					props.game.running && (
						<EndGame
							users={props.users}
							game={props.game}
							me={props.me}
						/>
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
