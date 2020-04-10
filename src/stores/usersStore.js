import { EventEmitter } from "events";
import dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _users = [];

class UserStore extends EventEmitter {
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	getUsers() {
		return _users;
	}
}

const store = new UserStore();

dispatcher.register((action) => {
	switch (action.actionTypes) {
		case actionTypes.USER_ADDED:
			_users.push(action.user);
			store.emitChange();
			break;
		case actionTypes.USER_LOADED:
			_user = action.users;
			store.emitChange();
			break;
	}
});
