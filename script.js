const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Set saltrounds for bcrypt
const saltRounds = 10;

// configure knex to interface with db
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'Jon',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

// configure middleware
app.use(bodyParser.json());
app.use(cors());

// set up port
app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
})

app.get('/',(req,res) => {
	res.send('it is working')
	//db.select('*').from('users')
	//.then(data => res.json(data))
})

// this is an example of doing something intersting, look at signin module
app.post('/signin', signin.handleSignIn(db , bcrypt));

app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)});

app.put('/image', (req,res) => {image.handleImage(req,res, db)});

app.post('/imageurl', (req,res) => {image.handleApiCall(req,res, db)});



