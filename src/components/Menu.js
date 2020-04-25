import React, { useState } from "react";
import * as gameApi from "../apis/gameApi";
import * as userApi from "../apis/userApi";
import * as chatApi from "../apis/chatApi";

export default function Menu(props) {
	const [visible, setVisible] = useState(false);

	function toggleMenu() {
		setVisible(!visible);
	}

	function clear() {
		function clear() {
			gameApi.clearGameField(props.game);
			chatApi.addBotChat(`Wipe it 🧻🧻`);
		}
	}

	function resetGame() {
		gameApi.resetGame();
		let allUsers = [...props.users, props.me];
		allUsers.map((user) => {
			userApi.resetUser(user);
		});
		setVisible(false);
	}

	function clearMsg() {
		chatApi.deleteAllChats();
		setVisible(false);
	}

	return (
		<div className="absolute z-10 top-0 right-0 m-3">
			<a
				onClick={toggleMenu}
				href="#"
				className="menu-icon border-icon"
			></a>
			<div
				id="menu-options"
				className={`${
					visible ? "" : "hidden"
				} absolute right-0 bg-white w-32 p-4 rounded-md shadow border-4 border-green-500`}
			>
				<ul>
					<li className="mb-3">
						<a href="#" onClick={clearMsg} id="clrMsg">
							Clear Msg
						</a>
					</li>
					<li className="border-b-2 border-gray-400">
						<a href="#" onClick={resetGame} id="reset">
							Reset
						</a>
					</li>
					<li className="border-b-2 border-gray-400">
						<a href="#" onClick={clear} id="reset">
							Clear
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
