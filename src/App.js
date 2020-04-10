import React, { useState, useEffect } from "react";
import UserDetails from "./components/UserDetails";
import Game from "./components/Game";
import "./App.css";

function App() {
	const username = localStorage.getItem("username") || "";
	const playerNum = localStorage.getItem("playerNum") || 0;
	const deck = JSON.parse(localStorage.getItem("deck")) || [];

	return (
		<div className="App ">
			{username === "" && <UserDetails />}
			{username !== "" && <Game username={username} deck={deck} />}
		</div>
	);
}

export default App;
