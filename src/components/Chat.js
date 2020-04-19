import React, { useState, useEffect } from "react";
import * as chatApi from "../apis/chatApi";

export default function Chat(props) {
	const [message, setMessage] = useState("");

	function postMessage(event) {
		event.preventDefault();
		let msg = {
			user: props.me.id,
			message: message,
		};
		chatApi.addChat(msg);
		setMessage("");
	}

	function handleChange({ target }) {
		setMessage(target.value);
	}
	//controlled vs uncontrolled component
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
	);
}
