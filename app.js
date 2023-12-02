const express = require('express');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');
const Person = require('./modules/db');

//const patientsFilePath = path.join(__dirname, 'mocData', 'patients.json');
//const data = JSON.parse(fs.readFileSync(patientsFilePath, 'utf-8'));
//const patientsData = data.patients;
//console.log(patientsData);
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');  // Set the view engine to EJS

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(express.static(__dirname + '/public'));
app.use(fileUpload());


app.get('/', (req, res) => {
    res.render('login');
});
//test
app.post('/existing_user/checkID', (req, res) => {
    const userID = req.body.ssn;
    console.log("CheckID route hit with ID:", userID);
   // const user = patientsData.find(patient => patient.id === userID);
    
    if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
    }
    
    // Return the user's name for further processing
    res.json({ name: `${user.firstName} ${user.lastName}` });
});


app.post('/existing_user/addEntry', (req, res) => {
    const userID = req.body.ssn;
    const entry = {
        date: req.body.date,
        food: req.body.food,
        sugarLevelAfterTwoHours: req.body.sugarLevelAfterTwoHours
    };
    
    const userIndex = patientsData.findIndex(patient => patient.id === userID);
    
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User does not exist' });
    }

    patientsData[userIndex].documentation.push(entry);
    
    // Save updated data back to patients.json
    fs.writeFileSync(patientsFilePath, JSON.stringify(patientsData, null, 2));
    
    res.json({ message: 'Entry added successfully!' });
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

app.get('/extraFields', (req, res) => {
    res.render('extraFields'); // You'll create this new view in the next step
});
app.get('/register', (req, res) => {
    res.render('register');
 });

app.post('/get-patient-data', (req, res) => {
    const userID = req.body.ssn;
    const user = patientsData.find(patient => patient.id === userID);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
});

app.post('/get-patient-data-date-range', (req, res) => {
    const { ssn, startDate, endDate } = req.body;
    // Your logic to filter the patient's logs based on the date range
    // For now, we use the mock data you provided
    const patient = mockData.patients.find(p => p.id === ssn);
    if (patient) {
        const filteredLogs = patient.logs.filter(log => {
            const logDate = new Date(log.date);
            return logDate >= new Date(startDate) && logDate <= new Date(endDate);
        });
        res.json({ logs: filteredLogs });
    } else {
        res.status(404).send('Patient not found');
    }
});
app.post('/completeRegistration', (req, res) => {
    // Get the file that was set to our field named "picture"   
  picture=req.files.picture   
  picture.mv('public/images/' +picture.name);
  res.send('Done!')
});

app.get('/save', async (req, res) => {   
    let person = new Person(req.query);
    console.log(req.query.password)
    try {
        await person.save();
        res.status(201).send(person);
    } catch (error) {
        res.status(500).send(person);
    }
});
app.get('/read', async (req, res) => {
    var parameterId=req.query.id
   // console.log(parameterId)
    var parameterPass=req.query.password
    var name = "dror"
    try {
        const people = await Person.find({"firstName":"dror"});  
        console.log(people)      
        var result={people:people}
        res.status(201).send(result);
       // res.render("pages/persondata",result)
    } catch (error) {
        res.status(500).send(error);
    }
});


function checkFaceImg(){

}

function showUserDetails(userName) {
    // Set the user name in the welcome message
    document.getElementById('userName').textContent = userName;

    // Show the user details and welcome message
    document.getElementById('userDetailsWelcome').style.display = 'block';

    // Show the extra fields form
    document.getElementById('extraFieldsIframe').style.display = 'block';

    // Show the sugar chart container
    document.getElementById('chartContainer').style.display = 'block';
}



 
 
