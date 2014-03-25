/**
 * BookmarkController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {
  
  get: function(req,res){
  	Bookmark.find({
		user: req.session.uid
	}).done(function(err, bookmarks){
		res.send(bookmarks)
	});
  },

  post: function(req,res){
  	Bookmark.create({
		name: req.param('name'),
		user: req.session.uid,
		place: req.param('place')
	}).done(function(err, bookmark) {
		res.send(bookmark);
	});
  }

};
