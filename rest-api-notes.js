// -----------------------------------
// ------ REST-api with Mongodb ------
// -----------------------------------
// Install mongodb on the computer
// npm i --save body-parser express mongoose nodemon
// npm i --save-dev babel-cli babel-preset-es2015 babel-preset-stage-0
// Setup .babelrc { "presets": [ "env", "stage-0" ]}

// RESTful APIs - Using HTTP protocols to do transactions with a backend
// Using GET, POST, PUT and DELETE calls to the backend
//"start": "nodemon ./index.js --exec babel-node -e js" - package.JSON
// We created three diretories under src - controllers with crmController.js, models with crmModel.js and routes with crmRoutes.js

import routes from './src/routes/crmRoutes'; // import routes into our main index.js
routes(app); // use routes in our main file

// ------- Midldleware ------- functions that have access to the request and response object of our express application
  .get((req, res, next) => {
    // middleware is the first function
    console.log(`Request from: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)
    next();
  }, getContacts)

// --- MongoDB --- 
// Database with collections
// Collections have documents or objects
// Documents look like key-value pair JSON object
  
// run mongoDB - we first have to run this command in project folder mkdir -p /data/db
// $ mongod
// we can cooect to it now in Robo 3T

import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useMongoClient: true
})

//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// --- Creating schema --- in file crmModel we specify schema details
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default ContactSchema = new Schema({
  firstName: {
    type: String,
    required: 'Enter a first name'
  },
  phone: {
    type: Number  
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

// Controller
import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel'; 

// apply our ContactSchema to our contact model 
const Contact = mongoose.model('Contact', ContactSchema);

// function adding new contacts to a database
export const addNewContact = (req, res) => {
    let newContact = new Contact(req.body);
    // save contact to the database
    newContact.save((err, contact) =>{
        if (err){res.send(err)} // check for error
        res.json(contact);      // json sent to the endpoint
    });
};

export const getContactWithID = (req, res) => {
  // findById is a mongo function 
  Contact.findById(req.params.contactID, (err, contact) => {
      if(err) { res.send(err); } 
      res.json(contact);
  })
}

// Posting Contact to the database 
import { addNewContact } from "../controllers/crmController"; // we bring add new contact to the route
app.route('/contact')
    .post(addNewContact)

// Updating data
app.route('/contact/:contactId')
    .put(updateContact)

export const updateContact = (req, res) => {
  Contact.findOneAndUpdate( { _id: req.params.contactID}, req.body, { new: true }, (err, contact){
      res.json(contact);
  })
}

// Delete
app.route('/contact/:contactId')
    .delete(deleteContact)

export const deleteContact = (req, res) => {
  Contact.remove({ _id: req.params.contactId }, (err, contact) => {
      res.json({ message: 'Successfully deleted contact'});
  })
}