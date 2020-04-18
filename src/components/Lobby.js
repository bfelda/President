import React from "react";
import * as gameApi from "../apis/gameApi";
import * as userApi from "../apis/userApi";

export default function Lobby(props) {
	const green = "green-600";

	function handleSubmit(event) {
		event.preventDefault();
		gameApi.startGame([...props.users, props.me]);
	}

	function removeUser(id) {
		userApi.removeUser(id).then((response) => {
			console.log(response);
		});
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
					<div className="flex">
						<div className="bg-white my-2 p-3 shadow flex-grow">
							{props.me.id}
						</div>
						<div
							onClick={() => removeUser(props.me, props.users)}
							className="bg-red-500 my-2 p-3 shadow text-white cursor-pointer"
						>
							Leave
						</div>
					</div>
					{props.users.map((user) => (
						<div className="flex">
							<div
								className="bg-white my-2 p-3 shadow flex-grow"
								key={user.id}
							>
								{user.id}
							</div>
						</div>
					))}
				</div>
				{[...props.users, props.me].length > 1 && (
					<input
						className={`bg-${green} py-2 cursor-pointer px-16 text-xl bold text-white mt-6 shadow disabled:shadow-none disabled:opacity-50`}
						type="submit"
						value="Start Game"
						id="user-submit"
					/>
				)}
			</form>
		</div>
	);
}
