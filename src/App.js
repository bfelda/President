import React, { useState, useEffect } from "react";
import firebase from "./services/firebase";
import UserDetails from "./components/UserDetails";
import Lobby from "./components/Lobby";
import Game from "./components/Game";
import MyArea from "./components/MyArea";
import Menu from "./components/Menu";
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

	const [messages, setMessages] = useState([]);

	//Messages
	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection("chatList")
			.onSnapshot((snapshot) => {
				const passedMsg = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setMessages(passedMsg);
			});
		return () => unsubscribe();
	}, []);

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
					setUsers(
						storeUsers.sort((a, b) => a.winOrder - b.winOrder)
					);
				}
			});
		return () => unsubscribe();
	}, []);

	return (
		<div className="App">
			{me.id ? (
				game.running ? (
					<div className="flex flex-col justify-between h-screen">
						<Menu
							users={users}
							game={game}
							me={me}
							messages={messages}
						/>
						<Game
							messages={messages}
							game={game}
							users={users}
							me={me}
						/>
						<MyArea me={me} users={users} game={game} />
					</div>
				) : (
					<Lobby users={users} me={me} game={game} />
				)
			) : game.running ? (
				<div className="flex h-screen items-center justify-center text-3xl text-white">
					<div className="mx-20 text-center">
						There's a game in play, when it's done you'll be able to
						join
					</div>
				</div>
			) : (
				<UserDetails />
			)}
		</div>
	);
}

export default App;
