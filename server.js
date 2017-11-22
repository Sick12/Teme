var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var accountsJSON = require('./accounts.json');
var fs = require('fs');
var port = 3000;
var path = require('path');

//Body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Use static files (html, css, etc);
//app.set('views', express.static(path.join(__dirname, 'view')));
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
//Import routes
var users = require('./routes/users');
app.use('/users', users);
//console.log(accountsJSON);

app.get('/', function(req, res) {
    res.render('index');
});

// app.get('/users', function(req, res) {
//     res.send(accountsJSON);
// });

// app.post('/users', function(req, res) {
//     var user = {
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password
//     };
    
// //     var parseUser = JSON.stringify(user);
// //     //var stringUser = JSON.stringify(user);
// //    var x= accountsJSON.users.push(parseUser);
// //    console.log(x);
// // //    var stringUser = JSON.stringify(user, null, 2);
// //      res.status(200).send(x);

// var readJSON = fs.readFileSync('accounts.json', 'utf-8');
// var parseUser = JSON.parse(readJSON);
// var jsonAccount = parseUser.users.push(user);
// var writeNewUser  = JSON.stringify(parseUser, null, 2);

// fs.writeFile('accounts.json',writeNewUser ,'utf-8', function(err) {
//     if (err) throw err;
//      else {
//          for(var i = 0; i < jsonAccount.length; i++) {
//            if(jsonAccount[i].username != user.username) {
//             res.status(200).send(user);
//             break;
//            }
//          }
//          res.status(500).send({error:'The username ' + user.username + ' already exists, please choose another one.'});
//     }
//   });
// });




// app.post('/users/login', function(req, res) {
// //search in accounts and check if data matches
//     var readJSON = fs.readFileSync('accounts.json', 'utf-8');
//     var parseUser = JSON.parse(readJSON);
//     var userName = req.body.username;
//     var userPass = req.body.password;
//     var jsonAccount = parseUser.users;
//     //var stringDirectFile = JSON.stringify(accountsJSON, null, 2);
//     if(!userName || userName.length == 0 || !userPass || userPass.length == 0) {
//         return res.status(500).send({error:'Username and password fields cannot be empty'});
//     } else {
//         for(var i = 0; i < jsonAccount.length; i++) {
//             if(jsonAccount[i].username == userName && jsonAccount[i].password == userPass) {
//                return res.status(200).send('Welcome,' +jsonAccount[i].username + ' pass: ' + jsonAccount[i].password);
//                 break;
//             }
//         }
//         res.status(404).send({error:"Invalid username: " + userName + ' & pass: ' + userPass});
//     }
 
// });


// var objArr = [
//     {
//         username:"user0",
//         password:"pass0"
//     },
//     {
//         username:"user1",
//         password:"pass1"
//     },
//     {
//         username:"user2",
//         password:"pass2"
//     }
// ];

// console.log(objArr[2]);
//  var readJSON = fs.readFileSync('accounts.json', 'utf-8');
//  var parsed = JSON.parse(readJSON);
// for(var i = 0; i < parsed.users.length; i++) {
//     console.log(parsed.users[i].username);
    
// }

//console.log(accountsJSON.users[2].username);

app.listen(port, function() {
    console.log('\nAPI started on port: ' + port);
});



