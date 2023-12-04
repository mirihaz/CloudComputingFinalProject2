const Person = require('../models/patientDB');

class existingUserHandler
{
    async GetPatientData(req, res) 
    {
		console.log('GetPatientData- request:', req.body);
        let parameterId=req.body.id;

        try 
        {
            const people = await Person.find({"id":parameterId});  
            console.log('GetPatientData:',people);      
             
            let result={people:people}
            //res.status(201).send(result);
            res.render('user_info', { people: people });
         } catch (error) {
            console.log('GetPatientData - error:', error);
            res.status(500).send({error: error.message});
         }
    }

    async AddEntryToPatientData(req, res)
    {
        console.log('AddEntryToPatientData- request:', req.body);
        let patientId=req.body.id;
        console.log(patientId);
        let newCondition = {
            c1HbA: req.body.sugarLevelAfterTwoHours, 
            c1HbAdate: req.body.date
        };
        try 
        {
            // Find the person by ID and update the conditionsSummary array
            const updatedPerson = await Person.findOneAndUpdate(
              { id: patientId },
              { $push: { conditionsSummary: newCondition } },
              { new: true } 
            );
        
            if (updatedPerson) {
              console.log('Condition added successfully:', updatedPerson);
              return updatedPerson;
            } else {
              console.error('Person not found with the provided ID.');
              return null;
            }
          } catch (error) {
            console.error('Error adding condition:', error);
            throw error;
          }
        
        
    }
}
module.exports = new existingUserHandler();
