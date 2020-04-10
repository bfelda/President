import dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

export function saveUser(username) {
	localStorage.setItem("username", username);
	dispatcher.dispatch({
		actionType: actionTypes.USER_ENTERED,
	});
}

export function loadUser() {
	localStorage.getItem("username");
	dispatcher.dispatch({
		actionType: actionTypes.USER_LOADED,
	});
}
