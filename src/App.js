import React, { useState, useEffect } from "react";
import firebase from "./services/firebase";
import UserDetails from "./components/UserDetails";
import Lobby from "./components/Lobby";
import Game from "./components/Game";
import MyArea from "./components/MyArea";
import "./App.css";

function App() {
	//get username from storage
	const username = localStorage.getItem("username");
	if (username) {
		//if the usename exists, get the firebase doc
		var docRef = firebase.firestore().collection("userList").doc(username);
		docRef.get().then((doc) => {
			//if the firebase doc doesn't exist, delete the storage
			if (!doc.exists) {
				localStorage.removeItem("username");
				window.location.reload();
			}
		});
	}

	//list of users
	const [users, setUsers] = useState([]);

	//game single instance
	const [game, setGame] = useState({
		running: false,
		activeDeck: [],
		discardedDeck: [],
	});

	//local user that is in storage
	const [me, setMe] = useState({
		id: username,
		deck: [],
	});

	//All about game data
	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection("gameList")
			.onSnapshot((snapshot) => {
				const game = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setGame(game[0]);
			});
		return () => unsubscribe();
	}, []);

	//All About User List
	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection("userList")
			.onSnapshot((snapshot) => {
				const storeUsers = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				if (username) {
					setUsers(storeUsers.filter((u) => u.id !== username));
					setMe(storeUsers.filter((u) => u.id === username)[0]);
				} else {
					setUsers(storeUsers);
				}
			});
		return () => unsubscribe();
	}, []);

	return (
		<div className="App">
			{me.id ? (
				game.running ? (
					<div className="flex flex-col justify-between h-screen">
						<Game game={game} users={users} />
						<MyArea me={me} users={users} game={game} />
					</div>
				) : (
					<Lobby users={users} me={me} game={game} />
				)
			) : (
				<UserDetails />
			)}
		</div>
	);
}

export default App;
