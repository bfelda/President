import React from "react";

export default function WinOrder(props) {
	return (
		<span className="pl-2">
			{!props.me.observer && props.me.winOrder === 1 && "👑"}
			{!props.me.observer &&
				props.me.winOrder === props.users.length + 1 &&
				"💩"}
		</span>
	);
}
