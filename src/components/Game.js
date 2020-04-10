import React from "react";

export default function Game(props) {
	return (
		<div className="absolute h-screen w-screen">
			<h1>{props.username}</h1>
			{props.deck.map((card) => (
				<div>{card}</div>
			))}
		</div>
	);
}
