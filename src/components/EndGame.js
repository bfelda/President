import React from "react";
import * as gameApi from "../apis/gameApi";
import * as userApi from "../apis/userApi";

export default function EndGame(props) {
	const allUsers = [...props.users, props.me];

	function startTimer() {
		setTimeout(() => {
			console.log("started!!!!!!!!!!!!!!!!!");
		}, 5000);
	}

	function resetGame() {
		gameApi.resetGame();
		let allUsers = [...props.users, props.me];
		allUsers.map((user) => {
			userApi.resetUser(user);
		});
	}

	return (
		<div
			className="bg-white p-8 absolute z-10 shadow rounded"
			onLoad={startTimer}
		>
			{allUsers.map((user, index) => {
				return (
					<div key={index} className="text-xl py-4">
						{user.id}
						{user.winOrder === 1
							? ": 👑"
							: user.winOrder === allUsers.length
							? ": 💩"
							: ""}
					</div>
				);
			})}
			<button
				onClick={resetGame}
				className=" ml-2 bg-red-400 text-white text-xl rounded shadow-md px-8 py-4"
			>
				Reset
			</button>
		</div>
	);
}
