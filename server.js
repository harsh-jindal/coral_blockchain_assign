const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

// Bodyparser Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

let con = mysql.createConnection({
  host: "db-intern.ciupl0p5utwk.us-east-1.rds.amazonaws.com",
  user: "dummyUser",
  password: "dummyUser01",
  database: "db_intern",
  port: '3306',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
})

con.connect(err => {
  if (err)
    console.log(err);
  else
    console.log("DB connected");
})

app.post("/insert", (req, res) => {
  let body = req.body;
  let query = `SELECT * FROM userData WHERE emailId='${body.emailId}'`;
  con.query(query, (err, result) => {
    if (result.length > 0) {
      query = `UPDATE userData SET username='${body.username}',password='${body.password}',phoneno=${body.phoneno},dateTime=NOW() WHERE emailId='${body.emailId}'`;
      con.query(query, (err, results, fields) => {
        if (err) {
          res.send(JSON.stringify({ "message": "User Updation Unsuccessfull", "status": "fail" }));
          return console.error({ "error": err.message });
        }
        res.send(JSON.stringify({ "message": "User Updated Successfully", "status": "success" }));
        console.log('Row Updated:' + results);
      })
    }
    else {
      query = `INSERT INTO userData(username,emailId,phoneno,password,dateTime) VALUES ('${body.username}','${body.emailId}','${body.phoneno}',${body.password},NOW())`;
      con.query(query, (err, results, fields) => {
        if (err) {
          res.send(JSON.stringify({ "message": "User Insertion Unsuccessfull", "status": "fail" }));
          return console.error(err.message);
        }
        res.send(JSON.stringify({ "message": "User Inserted Successfully", "status": "success" }));
        console.log('Row inserted:' + results);
      })
    }
  });
})

app.get("/search", (req, res) => {
  let body = req.query;
  let query = `SELECT * FROM userData WHERE emailId='${body.email}'`;
  con.query(query, (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    if (result.length > 0) {
      console.log(JSON.stringify(result[0]));
      res.send(JSON.stringify(result[0]));
    } else {
      res.send(JSON.stringify({ "message": "User Does not exist" }));
    }
  })
});

app.post("/delete", (req, res) => {
  let body = req.body;
  let query = `DELETE FROM userData WHERE emailId='${body.email}'`;
  con.query(query, (err, result) => {
    if (err) {
      res.send(JSON.stringify({ "message": "User Deletion Unsuccessfull", "status": "fail" }));
      return console.error(err.message);
    }
    if (result.length > 0) {
      res.send(JSON.stringify({ "message": "User Deleted Successfully", "status": "success" }));
    } else {
      res.send(JSON.stringify({ "message": "User Does not exist", "status": "fail" }));
    }

  })
});

const port = 3000;
app.listen(3000, () => console.log(`Server has started on port: ${port}`))