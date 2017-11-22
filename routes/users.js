var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var accountsJSON = require('../accounts.json');
var fs = require('fs');
var router = express.Router();

//Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


router.get('/', function (req, res) {
    // res.send(accountsJSON);
    //res.send(accountsJSON);
    var readJSON = fs.readFileSync('./accounts.json', 'utf-8');
    res.send(JSON.parse(readJSON));
});

router.get('/register', function (req, res) {
    res.render('register');
});


router.post('/register', function (req, res) {
    var user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    var dataJSON = JSON.parse(fs.readFileSync('./accounts.json'), 'utf-8');
    for (var i = 0; i < dataJSON.users.length; i++) {
        if (user.username == dataJSON.users[i].username) {
            return res.status(500).send({ error: 'The username ' + user.username + ' already exists, please choose another one.' });
        }
    }
    dataJSON.users.push(user);
    fs.writeFileSync('./accounts.json', JSON.stringify(dataJSON, null, 2));
    //, function (err) {
    //    // if (err) throw err;
    res.send('The user ' + user.username + ' added to JSON file');
    // });
});





router.get('/login', function (req, res) {
    res.render('login');
});



router.post('/login', function (req, res) {
    //search in accounts and check if data matches
    var dataJSON = JSON.parse(fs.readFileSync('./accounts.json'), 'utf-8').users;
    //var readJSON = fs.readFileSync('./accounts.json', 'utf-8');
    //var parseUser = JSON.parse(readJSON);
    var userName = req.body.username;
    var userPass = req.body.password;
    //var jsonAccount = parseUser.users;
    //var stringDirectFile = JSON.stringify(accountsJSON, null, 2);
    if (!userName || userName.length == 0 || !userPass || userPass.length == 0) {
        return res.status(500).send({ error: 'Username and password fields cannot be empty' });
    } else {
        for (var i = 0; i < dataJSON.length; i++) {
            if (userName == dataJSON[i].username && userPass == dataJSON[i].password) {
                return res.status(200).send('Welcome, ' + dataJSON[i].username + ' pass: ' + dataJSON[i].password);
                break;
                
            }
        }
        res.status(404).send({ error: "Invalid username: " + userName + ' & pass: ' + userPass });
    }

});


module.exports = router;