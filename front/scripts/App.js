'use strict';
// Main module
var App = angular.module('App', [

]);

var service_url = '//localhost:1337/';

App.factory('session', function($rootScope, $http) {
	var user = {};

	user.isLogged = false;

	user.data = {
		username: '',
		email: '',
		password: ''
	};

	user.contacts = [];

	user.login = function(callback) {
		$http({
			url: service_url + 'user/login',
			method: 'post',
			withCredentials: true,
			data: user.data
		}).success(function(data, status) {
			user.data = data;
			user.isLogged = true;
			if(callback)
				callback();
		}).error(function(data, status, headers, config) {
		});
	}

	user.register = function(callback) {
		$http({
			url: service_url + 'user/register',
			method: 'post',
			withCredentials: true,
			data: user.data
		}).success(function(data, status) {
			user.data = data;
			user.isLogged = true;
			if(callback)
				callback();
		}).error(function(data, status, headers, config) {

		});
	}

	user.logout = function(callback) {
		$http({
			url: service_url + 'user/logout',
			method: 'post',
			withCredentials: true
		}).success(function(data, status) {
			user.data = {};
			user.isLogged = false;
		}).error(function(data, status, headers, config) {

		});
	}
	
	user.delete = function(callback) {
		$http({
			url: service_url + 'user/delete',
			method: 'post',
			withCredentials: true
		}).success(function(data, status) {
			user.data = {};
			user.isLogged = false;
		}).error(function(data, status, headers, config) {

		});
	}

	return user;
});


App.controller('InitController', function($scope, session) {
	$scope.session = session;
});

App.controller('RegisterController', function($scope, session) {
	$scope.session = session;
});