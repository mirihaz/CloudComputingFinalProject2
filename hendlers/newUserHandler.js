const Person = require('../models/patientDB');

class newUserHandler
{
    async addPatient(req, res) 
    {
		console.log('addPatient- request:', req.body);
       // const picture = req.files.picture;
        //const isFaceImg = await this.checkIfFaceImg(picture);
        //saveImg(picture);
        let newPerson = req.body; 
        newPerson.conditionsSummary = {c1HbA: newPerson.glucoseLevel}

        let person = new Person(newPerson);
        try {
            await person.save();
            return person;
        } 
        catch (error) {
            console.log('addPatient - error: faild in saving person in db');
            res.status(500).send({error: error.message});
        }
	}

    async saveImg(img) 
    {
		img.mv('mocData/images/' + img.name);
		console.log();
	}
}
module.exports = new newUserHandler();
