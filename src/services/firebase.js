import firebase from "firebase";

const config = {
	apiKey: "AIzaSyBY-uZxOIAeGTiwW3v9uNXg6xagoUSPA28",
	authDomain: "president-5fd75.firebaseapp.com",
	databaseURL: "https://president-5fd75.firebaseio.com",
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
