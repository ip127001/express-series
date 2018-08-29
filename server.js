var express = require("express");
var app = express();

var fs = require('fs');
var _ = require('lodash');
var users = [];

fs.readFile('users.json', {
    encoding: 'utf-8'
}, function (err, data) {
    if (err) throw err;

    JSON.parse(data).forEach(function (user) {
        user.name.full = _.startCase(user.name.first + ' ' + user.name.last);
        users.push(user);
    })
})

app.get('/', function (req, res) {
    var buffer = '';

    users.forEach(function (user) {
        buffer += "<a href='/" + user.username + "'>" + user.name.full + "</a>" + '<br>';
    })
    res.send(buffer);
});

app.get(/big.*/, function (req, res, next) {
    res.send("me here and there");
    next();
})

app.get('/:username', function (req, res) {
    var username = req.params.username;
    res.send(username);
})



app.get('/yo', function (req, res) {
    res.send('yo world');
});

var server = app.listen(3000, function () {
    console.log("server running at http://localhost:" + server.address().port);
});