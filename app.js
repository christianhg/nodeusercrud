var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var dbPath = "mongodb://localhost/users";
var db = require("mongoose").connect(dbPath);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'some secret key'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index); // Read (GET)
app.post("/createUser", routes.createUser); // Create (POST)
app.get("/user/:_id", routes.user); // Update (GET)
app.put("/updateUser", routes.updateUser); // Update (PUT)
app.delete("/deleteUser/:_id", routes.deleteUser); // Delete (DELETE)

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});