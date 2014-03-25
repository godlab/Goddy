var chai = require('chai'),
    mocha = require('mocha'),
    should = chai.should(),
    request = require('request'),
    io = require('socket.io-client');

var j = request.jar()
var request = request.defaults({jar:j});

describe("User", function () {

    var users = [{
            username: 'test_1',
            email: 'test@godlab.cc',
            password: '123456' 
        }],
        url = "http://localhost:1337";

    beforeEach(function (done) {
        done();
    });

    it("Register", function (done) {
        request.get({
          url: url+'/user/register',
          form: users[0]
        }, function (err, response, body){
            if(response.statusCode == 200){
                done();
            }else{
                done("Can't");
            }
        });
    });

    it("Login", function(done){
       request.get({
          url: url+'/user/login',
          form: users[0]
        }, function (err, response, body){
            if(response.statusCode == 200)
                done()
            else
                done("Can't");
        }); 
    });

    it("Logout", function(done){
       request.get({
          url: url+'/user/logout',
          // form: users[0]
        }, function (err, response, body){
            if(response.statusCode == 200)
                done()
            else
                done("Can't");
        }); 
    });

    it("Lost Pass", function(done){
       request.get({
          url: url+'/user/lost_password',
          form: users[0]
        }, function (err, response, body){
            users[0].token = body;
            if(response.statusCode == 200)
                done()
            else
                done("Can't");
        }); 
    });

    it("Reset Pass", function(done){
        users[0].password = users[0].password + "AAA";
       request.get({
          url: url+'/user/reset_password',
          form: users[0]
        }, function (err, response, body){
            if(response.statusCode == 200)
                done()
            else
                done("Can't");
        }); 
    });
    
    
    it("Re Login", function(done){
       request.get({
          url: url+'/user/login',
          form: users[0]
        }, function (err, response, body){
            if(response.statusCode == 200)
                done()
            else
                done("Can't");
        }); 
    });

    it("Delete", function (done) {
        request.get({
          url: url+'/user/delete'
        }, function (err, response, body){   
            if(response.statusCode == 200)
                done()
            else
                done("Can't");
        });
    });
});