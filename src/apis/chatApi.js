import firebase from "../services/firebase";

export function deleteAllChats(chats) {
	chats.map((chat) => {
		firebase.firestore().collection("chatList").doc(chat.id).delete();
	});
}
