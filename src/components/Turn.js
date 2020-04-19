import React from "react";

export default function Turn(props) {
	return (
		props.cards &&
		props.cards.map((card) => (
			<div
				key={card.index}
				className={`card ${card.class} ${
					card.number === 4 && "opacity-75"
				}`}
			></div>
		))
	);
}
