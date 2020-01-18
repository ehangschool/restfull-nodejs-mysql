const http = require('http');
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const snapshot = require('snapshot');
const app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

const hostname = '127.0.0.1';
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'danoy'
  });

//   connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected!');
//   });

app.use(bodyParser.urlencoded({
    extended: true
}));


  app.get('/testbackend', function (req, res) {
    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected!');
      });
  });

  app.get('/testicels', function (req, res) {
    res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  });

//   app.fetch('/', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         user: {
//             name: "John",
//             email: "john@example.com"
//         }
//     })
// });

app.use(bodyParser.json());
  app.post('/register', function(req, res){
    var snapshot=req.body;
    var userid="";
    var email="";
    var username="";
    var no_telp= ""; 
    var password="";
    if (snapshot.userid !=null){userid=snapshot.userid}
    if (snapshot.email !=null){email=snapshot.email}
    if (snapshot.username !=null){username=snapshot.username}
    if (snapshot.no_telp !=null){no_telp=snapshot.no_telp}
    if (snapshot.password !=null){password=snapshot.password}
    var sql = "INSERT INTO users (userid ,email, username, no_telp, password) VALUES ('"+userid+"','"+email+"','"+username+"','"+no_telp+"','"+password+"')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("INSERTED");
    });
    res.json({ status: 'success', email : email });
    //   console.log(req.body.user.name)
  });

  app.listen(3000);
  console.log(`Server running at http://localhost:3000/`);

// const server = http.createServer((req, res) => {
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://localhost:3000/`);
// });