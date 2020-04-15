import React from "react";
import * as userApi from "../apis/userApi";
import * as gameApi from "../apis/gameApi";

export default function Lobby(props) {
	const green = "green-600";

	function handleSubmit(event) {
		event.preventDefault();
		gameApi.startGame(props.users);
	}

	return (
		<div className="h-screen w-screen flex justify-center items-center absolute">
			<form
				className="text-center w-full md:w-3/4 relative rounded px-20 py-10 shadow-lg bg-cards max-w-6xl"
				onSubmit={handleSubmit}
				action=""
				id="user-form"
			>
				<div className="shadow-md">
					<h1 className={`text-3xl bold text-white bg-${green}`}>
						Lobby
					</h1>
				</div>
				<div className="lobby-list">
					{props.users.map((user) => (
						<div className="bg-white my-2 p-3 shadow" key={user.id}>
							{user.id}
						</div>
					))}
				</div>
				{props.users.length > 1 && (
					<input
						className={`bg-${green} py-2 cursor-pointer px-16 text-xl bold text-white mt-6 shadow disabled:shadow-none disabled:opacity-50`}
						type="submit"
						value="Start Game"
						disabled={
							props.users.length < 3 ||
							props.users[0].id !== props.me.id
						}
						id="user-submit"
					/>
				)}
			</form>
		</div>
	);
}
