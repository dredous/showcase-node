var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var mongodb = require('mongodb');
var bodyParser = require('body-parser');

//----------------------------------------

var MongoClient = mongodb.MongoClient;
var db_url = 'mongodb://localhost:27017/ShowcaseApp'
var jsonParser = bodyParser.json();


var __dirName = "C:/Users/Edwin/Desktop/Node";

app.get('/notes', function(req, res) {
	res.json({notes: "LALALALALALALALALA"});
});

app.post('/users', jsonParser, function(req, res) {
	databaseManipulation("insert", "users", req.body);
	console.log(req.body);
	res.send("Data Received");
});

server.listen(3000, function() {
	console.log("Listening to port 3000");
});

function databaseManipulation(status, col, data) {
	MongoClient.connect(db_url, function(err, db) {
	if(err) {
		console.log("Unable to connect to mongodb server. Error: ", err);
	} else {
		console.log("Connection Established to ", db_url);
	}
	if(status == "insert") {
		var collection = db.collection('users');
		collection.insert([data], function(err, result) {
			if(err)
				console.log(err);
			else
				console.log("Inserted into documents");
		});
	}
	db.close();
	});
}