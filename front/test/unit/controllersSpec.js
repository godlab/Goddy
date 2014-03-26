'use strict';

/* jasmine specs for controllers go here */
describe('App Controllers', function() {

	describe('InitController', function() {

		var users = [{
			username: 'Pepe',
			password: 'Pepe1',
			email: 'pepe@godlab.cc'
		}, {
			username: 'Juan',
			password: 'Juan1',
			email: 'juan@godlab.cc'
		}]

		beforeEach(module('App'));

		it('No esta logueado', function(){
			inject(function(session) {
				expect(session.isLogged).toBe(false);
			});
		});

		it('Registro', inject(function(session) {
			runs(function(){
				session.data = users[0];
				session.register();
			});
			waitsFor(function(){
				console.log(session.data,session.isLogged);
				return true;
			});
			runs(function(){
				expect(session.isLogged).toBe(false);
			});			
		}));

		// it('Login', inject(function($httpBackend,session) {
		// 	$httpBackend.expectPOST(service_url + 'user/login');
		// 	session.data = users[0];
		// 	session.login();
		// 	$httpBackend.flush();
		// 	expect(session.isLogged).toBe(true);
		// }));

		// it('Logout', inject(function($httpBackend,session) {
		// 	$httpBackend.expectPOST(service_url + 'user/logout');
		// 	session.logout();
		// 	$httpBackend.flush();
		// 	expect(session.isLogged).toBe(false);
		// }));

		// it('Login', inject(function($httpBackend,session) {
		// 	$httpBackend.expectPOST(service_url + 'user/login');
		// 	session.data = users[0];
		// 	session.login();
		// 	$httpBackend.flush();
		// 	expect(session.isLogged).toBe(true);
		// }));

		// it('Delete', inject(function($httpBackend,session) {
		// 	$httpBackend.expectPOST(service_url + 'user/delete');
		// 	session.delete();
		// 	$httpBackend.flush();
		// 	expect(session.isLogged).toBe(false);
		// }));

	});
});