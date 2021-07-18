const express = require("express");
const mysql = require("mysql");
const app = express();

// Database Handshake
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "full_stack_db",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Database Connected Successfully.");
});

// Create New Database Called full_stack_db
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE full_stack_db";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("full_stack_db Database Created Successfully!");
  });
});

// Create Table in full_stack_db Database
app.get("/createtable", (req, res) => {
  let sql =
    "CREATE TABLE postings (id INT AUTO_INCREMENT, title VARCHAR(50), message VARCHAR(50), PRIMARY KEY(id));";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    console.log("postings table created successfully!");
  });
});

// Insert Record 1
app.get("/insertrow1", (req, res) => {
  let post = {
    title: "First Post",
    message: "This is my first post",
  };
  let sql = "INSERT INTO postings SET ?";
  db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    console.log("First Row Inserted Successfully!");
  });
});

// Insert Record 2
app.get("/insertrow2", (req, res) => {
  let post = {
    title: "Second Post",
    message: "This is my second post",
  };
  let sql = "INSERT INTO postings SET ?";
  db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    console.log("Second Row Inserted Successfully!");
  });
});

// SELECT Rows Command
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM postings WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    console.log("Record Retrieved Successfully!");
  });
});

// UPDATE Command
app.get("/updateposts/:id", (req, res) => {
  let newTitle = "This is updated title via hardcoded value";
  let sql = `UPDATE postings SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(sql);
    console.log(result);
    console.log("UPDATE QUERY Executed Successfully!");
  });
});

// DELETE Command
app.get("/deleteposts/:id", (req, res) => {
  let sql = `DELETE FROM postings WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("DELETE Command Executed Successfully!");
  });
});

// Server Listen
app.listen("3001", () => {
  console.log("Server running on Port 3001");
});
