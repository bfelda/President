import React, { useState, useEffect } from "react";
import firebase from "../services/firebase";

export default function Chat(props) {
	const [message, setMessage] = useState("");

	function postMessage(event) {
		event.preventDefault();
		let msg = {
			user: props.me.id,
			message: message,
		};
		firebase
			.firestore()
			.collection("chatList")
			.doc(JSON.stringify(Date.now()))
			.set(msg);
		setMessage("");
		document.querySelector("#new_message").value = "";
	}

	function handleChange({ target }) {
		setMessage(target.value);
	}

	return (
		<div
			id="chat"
			className="absolute right-0 w-full flex flex-col justify-end overflow-hidden"
		>
			<div className="flex-grow flex items-end w-56">
				<ul id="chat-messages" className="flex flex-col opacity-50">
					{props.messages.map((message, index) => (
						<li className="text-white" key={index}>
							{message.user}: {message.message}
						</li>
					))}
				</ul>
			</div>
			<div>
				<form className="flex flex-row" onSubmit={postMessage}>
					<input
						className="w-full"
						name="new_message"
						id="new_message"
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
	);
}
