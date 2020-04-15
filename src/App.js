import React, { useState, useEffect } from "react";
import firebase from "./services/firebase";
import UserDetails from "./components/UserDetails";
import Lobby from "./components/Lobby";
import Game from "./components/Game";
import MyArea from "./components/MyArea";
import * as gameApi from "./apis/gameApi";
import * as userApi from "./apis/userApi";
import "./App.css";

function App() {
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
		id: null,
		deck: [],
	});

	//All About Local User
	//get username from storage
	let username = localStorage.getItem("username");
	if (username) {
		//if the usename exists, get the firebase doc
		var docRef = firebase.firestore().collection("userList").doc(username);
		docRef.get().then((doc) => {
			//if the firebase doc exists, return the user
			if (doc.exists) {
				setMe({
					id: doc.id,
					...doc.data(),
				});
			}
			//if the firebase doc doesn't exist, delete the storage
			else {
				localStorage.removeItem("username");
			}
		});
	}

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
				const users = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				if (me.id !== null) {
					debugger;
					setUsers(users.filter((u) => u.id !== me.id));
					setMe(users.filter((u) => u.id === me.id));
				} else {
					setUsers(users.filter((u) => u.id !== me.id));
				}
			});
		return () => unsubscribe();
	}, []);

	return (
		<div className="App">
			{me.id ? (
				game.running ? (
					<Game game={game} users={users} />
				) : (
					<Lobby users={users} me={me} game={game} />
				)
			) : (
				<UserDetails />
			)}
			<MyArea me={me} users={users} game={game} />
		</div>
	);
}

export default App;
