/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  attributes: {
  	username: 'string',
  	email: 'string',
  	password: 'string',
  	validate: 'boolean',
  	// Clean internal attributes before return
  	toJSON: function() {
		var obj = this.toObject();
		// delete obj.updatedAt;
		// delete obj.createdAt;
		delete obj.validate;
		delete obj.password;
		return obj;
    }
  },
  beforeCreate: function(values,cb){
  	var self = this;
  	//Validate if email are duplicated
  	if(!values.email)
  		return cb('Undefined email.');
	User.findOne({ email: values.email }).done(function(err, user){
		if(err){
			return cb('Cant validate duplicate email, error in database.');
		}else{
			if (user && user.email == values.email){
				return cb('Duplicated email.');
			}else{
				return cb();
			}
		}
	});
  }
};