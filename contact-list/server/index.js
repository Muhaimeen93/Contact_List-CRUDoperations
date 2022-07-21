

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const mysql = require('mysql');
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "contact_list"
})
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = 3001;
app.use(cors());
app.use(express.json());
// Route to get all contacts
app.get("/api/get", (req, res) => {

    db.query("SELECT * FROM Contact,Address WHERE Contact.id=Address.id", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});

//Route to get the last id
app.get("/api/getLastId", (req, res) => {

    db.query("SELECT id FROM Contact ORDER BY id DESC LIMIT 1", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to get one contact
app.get("/api/getFromId/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM Contact,Address WHERE Contact.id = ? AND Contact.id=Address.id", [id], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to create new contact
app.post('/api/create', (req, res) => {

    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const email = req.body.email;
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;

    db.query("INSERT INTO Contact (id,firstName,lastName,phone,email) VALUES (?,?,?,?,?)", [id, firstName, lastName, phone, email], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
    db.query("INSERT INTO Address (id,street,city,state,zip) VALUES (?,?,?,?,?)", [id, street, city, state, zip], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
})

// Route for update contact
app.post('/api/update', (req, res) => {

    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const email = req.body.email;
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;

    db.query("UPDATE Contact SET firstName=?,lastName=?,email=?,phone=? WHERE Contact.id=?", [firstName, lastName, email, phone, id], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
    db.query("UPDATE Address SET street=?,city=?,state=?,zip=? WHERE Address.id=?", [street, city, state, zip, id], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
})


// Route to delete a contact

app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM Contact WHERE Contact.id= ?", [id], (err, result) => {
        if (err) {
            console.log(err)
        }
    })
    db.query("DELETE FROM Address WHERE Address.id= ?", [id], (err, result) => {
        if (err) {
            console.log(err)
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})