import React, { useState, useEffect } from "react";

export default function Card(props) {
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		props.onClick(props.card, selected);
	}, [selected]);

	function onCardClicked() {
		setSelected(!selected);
	}

	return (
		<div
			key={props.card.index}
			onClick={onCardClicked}
			className={`cursor-pointer card ${props.card.class} ${
				selected ? "shadow-outline" : ""
			}`}
		></div>
	);
}
