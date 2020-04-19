import firebase from "../services/firebase";

const repo = "chatList";

function deleteItem(doc) {
	firebase.firestore().collection(repo).doc(doc.id).delete();
}

export function deleteAllChats() {
	firebase
		.firestore()
		.collection(repo)
		.get()
		.then((querySnapshot) => {
			debugger;
			querySnapshot.forEach((doc) => {
				deleteItem(doc);
			});
		});
}

export function addChat(message) {
	firebase
		.firestore()
		.collection(repo)
		.doc(JSON.stringify(Date.now()))
		.set(message);
}

export function addBotChat(text) {
	let message = {
		user: "Pres-Bot",
		message: text,
	};
	addChat(message);
}
