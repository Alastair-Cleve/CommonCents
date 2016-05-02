var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var UserStore = new Store(AppDispatcher);

var _currentUser, _errors;
var _users = [];

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "LOGIN":
    	UserStore.login(payload.user);
      break;
    case "LOGOUT":
    	UserStore.logout();
      break;
    case "ERROR":
      UserStore.setErrors(payload.errors);
      break;
    case "ALL_USERS":
      UserStore.setUsers(payload.users);
      break;
  }
  UserStore.__emitChange();
};

UserStore.login = function(user){
	_currentUser = user;
  _errors = null;
};

UserStore.logout = function(){
  _currentUser = null;
  _errors = null;
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
