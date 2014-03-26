var chai = require('chai'),
    mocha = require('mocha'),
    should = chai.should(),
    request = require('request'),
    io = require('socket.io-client');

var j = request.jar()
var request = request.defaults({jar:j});

describe("Bookmarks", function () {

    var users = [{
            username: 'test_1',
            email: 'test@godlab.cc',
            password: '123456' 
        }],
        places = [{
            name: 'Test',
            place: 'side'
        }];
        url = "http://localhost:1337";

    beforeEach(function (done) {
        request.get({
          url: url+'/user/register',
          form: users[0]
        }, function (err, response, body){
            if(response.statusCode == 200)
                request.get({
                  url: url+'/user/login',
                  form: users[0]
                }, function (err, response, body){
                    if(response.statusCode == 200)
                        done()
                    else
                        done("Can't Login");
                });
            else
                done("Can't Register");
        }); 
    });

    afterEach(function (done) {
        request.get({
          url: url+'/user/delete',
          form: users[0]
        }, function (err, response, body){
            if(response.statusCode == 200)
                done()
            else
                done("Can't");
        }); 
    });

    it("GetAll", function (done) {
        request.get({
          url: url+'/bookmark/find',
          form: places[0]
        }, function (err, response, body){
            if(response.statusCode == 200){
                done();
            }else{
                done("Can't");
            }
        });
    });

    it("Create", function (done) {
        request.get({
          url: url+'/bookmark/create',
          form: places[0]
        }, function (err, response, body){
            if(response.statusCode == 200){
                places[0] = JSON.parse(body);
                done();
            }else{
                done("Can't");
            }
        });
    });

    it("Remove", function (done) {
        request.get({
          url: url+'/bookmark/destroy/'+places[0].id,
        }, function (err, response, body){
            if(response.statusCode == 200){
                console.log(url+'/bookmark/destroy/'+places[0].id);
                done();
            }else{
                done("Can't");
            }
        });
    });
});