/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var crypto = require('crypto'),
	nodemailer = require('nodemailer');

module.exports = {
    
	register: function(req,res){
		User.create({
			username: req.param('username'),
			email: req.param('email'),
			password: req.param('password')
		}).done(function(err,user){
			if(err){
				res.send(403,err);	
			}else{
				res.send({
					username: req.param('username'),
					email: req.param('email'),
					password: req.param('password')
				});
			}
		});
	},

	me: function(req,res){
		User.findOne({
			id: req.session.uid
		}).done(function(err, user){
			if(err){
				res.send(403,err);	
			}else{
				if(user){
					req.session.uid = user.id;
					res.send(user);	
				}else{
					res.send(false);
				}
			}
		});
	},
	
	login: function(req,res){
		User.findOne({
			email: req.param('email'),
			password: req.param('password')
		}).done(function(err,user){
			if(err){
				res.send(403,err);	
			}else{
				if(user){
					req.session.uid = user.id;
					res.send(user);	
				}else{
					res.send(403,false);
				}
				
			}
		});
	},

	logout: function(req,res){
		req.session.destroy();
		res.send(true);
	},

	lost_password: function(req,res){
		// UserLostPassword.create({
		// 	user:req.session.uid,
		// 	token: shasum(Date.now()).digest('base64')
		// });
		var shasum = crypto.createHash('sha256');
		
		User.findOne({
			email: req.param('email')
		}).done(function (err,user){
			if(err || !user){
				res.send('403','No User...');
			}else{
				var token = shasum.update(user.username + Date.now().toString()).digest('base64');
				UserLostPassword.create({
					user: user.id,
					token: token
				}).done(function(err,lostPass){
					if(err || !lostPass){
						res.send('403',"Can't create token.");
					}else{
						res.send(token);
						//TODO: send an email
						var mailOptions = {
						    from: "Goddy ✔ <info@goddy.com>", // sender address
						    to: user.email, // list of receivers
						    subject: "Reset Password", // Subject line
						    html: "Your token is <b>"+token+"</b>" // html body
						}

						// send mail with defined transport object
						sails.config.emailTransport.sendMail(mailOptions, function(error, response){
						    if(error){
						        res.send(403,"Can't send token email.");
						    }else{
						        // res.send(token);
						    }

						    // if you don't want to use this transport object anymore, uncomment following line
						    //smtpTransport.close(); // shut down the connection pool, no more messages
						});
					}	
				});	
			}
		});
	},

	reset_password: function(req,res){
		UserLostPassword.findOne({
			token: req.param('token')
		}).done(function(err,lostPassword){
			User.update({
				id: lostPassword.user
			},{
				password: req.param('password')
			}).done(function(err,user){
				res.send(true);
			})
		})
	},

	delete: function(req,res){
		User.destroy({
			id: req.session.uid
		}).done(function(err,user){
			if(err){
				res.send(403,err);	
			}else{
				res.send(true);
			}
		})
	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
