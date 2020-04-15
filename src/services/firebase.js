import firebase from "firebase/app";
import "firebase/firestore";

const config = {
	apiKey: "AIzaSyBY-uZxOIAeGTiwW3v9uNXg6xagoUSPA28",
	authDomain: "president-5fd75.firebaseapp.com",
	databaseURL: "https://president-5fd75.firebaseio.com",
	projectId: "president-5fd75",
	storageBucket: "president-5fd75.appspot.com",
	messagingSenderId: "807636744958",
	appId: "1:807636744958:web:4c6d767f6dea7799bcc3af",
	measurementId: "G-ZYBTRE593F",
};

firebase.initializeApp(config);
export default firebase;
