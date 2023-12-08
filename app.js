const express = require('express');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');
const newUserHandler = require('./hendlers/newUserHandler');
const existingUserHandler = require('./hendlers/existingUserHandler');

const app = express();
const PORT = 3000;
let user = '';

app.use(express.json());
app.set('view engine', 'ejs');  // Set the view engine to EJS


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(express.static(__dirname + '/public'));
app.use(fileUpload());


app.get('/', (req, res) => {
    res.render('login');
});

app.get('/login', (req, res) => {
    res.render('login'); // Note that we use 'logins' because your file name is logins.ejs
});

app.get('/new_user', (req, res) => {
    res.render('new_user');
 });

app.get('/existing_user', (req, res) => {
    res.render('existing_user');
 });

app.post('/getExistingUser', async (req, res) => existingUserHandler.GetPatientData(req, res));//from log in
app.post('/saveNewUser', async (req, res) =>{
    try
    {
        await newUserHandler.addPatient(req, res);
        console.log('addPatient finnished OK, start GetPatientData')
        await existingUserHandler.GetPatientData(req, res);
    } catch (error) {

    }
});
app.post('/existing_user/addEntry', async (req, res) => {
    try 
    {
        await existingUserHandler.AddEntryToPatientData(req, res);
        console.log('AddEntryToPatientData finnished OK, start GetPatientData')
        await existingUserHandler.GetPatientData(req, res);
    } catch (error) {
        console.error(error);
    }
});

app.post('/filter-by-date-range', async (req, res) => {
    const { startDate, endDate, id } = req.body;
});

 
 
