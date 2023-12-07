const mongoose = require('mongoose');

uri = "mongodb+srv://MainUser:MainUser123@cloudcomputingprjhit.embkdtj.mongodb.net/hitDB?retryWrites=true&w=majority";

mongoose.connect(uri, 
{   
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const personSchema = new mongoose.Schema({
    id: String,
    password: String,
    firstName: String,
    lastName: String,
    birthDate:Date,
    picture: String, 
    conditionsSummary : [
        {
            c1HbA : Number,
            c1HbAdate : {type: Date, default: Date.now, },           
        },
    ],
		
});

const Person = mongoose.model('Person', personSchema);

//exports->in this case will return the Person object.
module.exports = Person;