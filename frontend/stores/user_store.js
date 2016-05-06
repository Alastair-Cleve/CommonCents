var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var hashHistory = require('react-router').hashHistory;

var UserStore = new Store(AppDispatcher);

var _currentUser, _errors;
var _users = [];

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "LOGIN":
    	UserStore.login(payload.user);
      UserStore.__emitChange();
      break;
    case "LOGOUT":
    	UserStore.logout();
      UserStore.__emitChange();
      break;
    case "ERROR":
      UserStore.setErrors(payload.errors);
      UserStore.__emitChange();
      break;
    case "ALL_USERS":
      UserStore.setUsers(payload.users);
      UserStore.__emitChange();
      break;
  }
};

UserStore.login = function(user){
	_currentUser = user;
  _errors = null;
};

UserStore.logout = function(){
  _currentUser = null;
  _errors = null;
  hashHistory.push("/");
};

UserStore.currentUser = function(){
  if (_currentUser) {
  	return $.extend({}, _currentUser);
  }
};

UserStore.all = function(){
  return _users.slice(0);
};

UserStore.find_by_username = function(name){
  var keys = Object.keys(_users);
  for (var i = 1; i < keys.length; i++) {
    if (_users[i].username === name) {
      return _users[i];
    }
  }
};

UserStore.setErrors = function(errors){
  _errors = errors;
};

UserStore.setUsers = function(users){
  _users = users;
};

UserStore.errors = function(){
  if (_errors){
    return [].slice.call(_errors);
  }
};

module.exports = UserStore;
