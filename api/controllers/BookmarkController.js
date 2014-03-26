/**
 * BookmarkController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {
  
  find: function(req,res){
  	Bookmark.find({
		user: req.session.uid
	}).done(function(err, bookmarks){
		res.send(bookmarks)
	});
  },

  create: function(req,res){
  	Bookmark.create({
		name: req.param('name'),
		user: req.session.uid,
		place: req.param('place')
	}).done(function(err, bookmark) {
		res.send(bookmark);
	});
  },

  destroy: function(req,res){
  	Bookmark.findOne({
  		id: req.param('id'),
		user: req.session.uid
	}).done(function(err, bookmark){
		if(err || !bookmark){
			res.forbidden();
		}
		console.log('a',bookmark);
		Bookmark.remove(bookmark.id).done(function(err,bookmark){
			if(err || !bookmark)
				res.forbidden()
			res.send(bookmark);
		})
	});
  }

};
