const Person = require('../models/patientDBModel');
const sendImageForTagging = require('../models/checkImageModel');
const { boolean } = require('webidl-conversions');

//const {parseStringPromise} = require('xml2js');


class newUserHandler
{
    async addPatient(req, res) 
    {
		console.log('addPatient- request:', req.body);
        const existingPerson = await Person.findOne({ "id": req.body.id });
        if(!existingPerson)
        {
            const isFaceImg = await this.checkIfFaceImg(req.files.picture);
            if(isFaceImg)
            {
                console.log('isFaceImg OK')
                await this.saveImg(req.files.picture);
            
                let newPerson = req.body; 
                newPerson.picture = req.files.picture.name;
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
            }else{
                res.status(500).send({error:'no pic'});
            }
        }else{
            return res.render('new_user', { errorMessage: 'User with the same ID already exists.' });
        }
        
        
	}

    async checkIfexist(id)
    {
        try 
        {
            const existingPerson = await Person.findOne({ "id": id });
            return existingPerson;

         } catch (error) {
            console.log('GetPatientData - error:', error);
            res.status(500).send({error: error.message});
         }
    }
    async checkIfFaceImg(img)
    {
        try 
        {
            console.log('checkIfFaceImg - start');
            let imgTags = await sendImageForTagging(img);
            console.log('checkIfFaceImg - tag finished with OK');
            
            // Filter objects where confidence is higher than 50%
            const filteredTags = imgTags.filter(item => item.confidence > 50).map((item)=>item.tag.en);
            console.log('checkIfFaceImg - tags: ',filteredTags );

            const result = await filteredTags.includes('face');
            console.log('checkIfFaceImg - result: ',result );
            return(result);

        } catch (error) {
            res.status(500).send('An error occurred');
        }
        
    }

    async saveImg(img) 
    {
        try 
        {
            img.mv('public/images/' + img.name);
            console.log(img.name + ' image saved.');
            return img.name;

        }catch (error) {
            console.log('saveImg - error: ', error.message);
            res.status(500).send({error: error.message});
            return null;
        }
	}
}
module.exports = new newUserHandler();
