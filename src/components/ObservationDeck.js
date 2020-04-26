import React, { useState, useEffect } from "react";
import * as chatApi from "../apis/chatApi";

export default function ObservationDeck(props) {
	const [message, setMessage] = useState("");

	function postMessage(event) {
		event.preventDefault();
		let msg = {
			user: "Observation Deck",
			message: message,
		};
		chatApi.addChat(msg);
		setMessage("");
	}

	function handleChange({ target }) {
		setMessage(target.value);
	}
	return (
		<div className="flex flex-col h-screen relative">
			<div className="flex flex-col items-center justify-center mt-20">
				<div className="mx-20 text-center text-3xl text-white">
					There's a game in play, when it's done you'll be able to
					join. <br /> Here's who's currently in:
				</div>
				<div className="flex flex-row text-white text-xl text-thin mt-5">
					{props.users.map((user) => (
						<div className="mx-5 bg-green-700 p-3">{user.id}</div>
					))}
				</div>
			</div>
			<div className="flex-grow relative overflow-hidden m-10">
				<div className="absolute bottom-0 w-full">
					<ul id="chat-messages" className="flex flex-col opacity-75">
						{props.messages.map((message, index) => (
							<li className="text-white" key={index}>
								<span className="font-thin">
									{message.user}
								</span>
								: {message.message}
							</li>
						))}
					</ul>
					<form
						className="flex flex-row w-full mt-5"
						onSubmit={postMessage}
					>
						<input
							className="w-full"
							name="new_message"
							id="new_message"
							value={message}
							onChange={handleChange}
						></input>
						<button
							type="submit"
							className="bg-green-500 text-white p-2"
						>
							Post
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
