var mongoose = require("mongoose");
var User = require("../data/models/user");


exports.index = function(req, res) {
	User.find(function(err, users) {
		if(req.session.error) {
			res.render('index', {
				title: "Usercrud",
				users: users,
				error: req.session.error
			});
			console.log(req.session.error);
			req.session.destroy();
		} else {
			res.render('index', {
				title: "Usercrud",
				users: users,
			});
		}
	});
	
};


exports.user = function(req, res) {
	User.findById(req.params._id, function(err, user) {
		res.render('update', {
			title: "Usercrud",
			user: user 
		});
	});
}

exports.updateUser = function(req, res) {
	User.findById(req.param("_id"), function(err, user) {
		user.username = req.param("username");
		user.name.first = req.param("firstName");
		user.name.last = req.param("lastName");
		user.save(function() {
			res.redirect("/");
		});
	});	
}

exports.createUser = function(req, res) {
	new User({
		username: req.param("username"),
		name: {
			first: req.param("firstName"),
			last: req.param("lastName")
		}
	}).save(function(err) {
		if(err) {
			req.session.error = err;
			res.redirect("/");
		} else {
			res.redirect("/");
		}
	});
}

exports.deleteUser = function(req, res) {
	User.findById(req.params._id, function(err, user) {
		user.remove(function() {
			res.redirect("/");
		})
	});
}