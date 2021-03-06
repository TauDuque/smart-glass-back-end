const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const Signin = require('./controllers/Signin');
const Profile = require('./controllers/Profile');
const Image = require('./controllers/Image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

db.select('*').from('users');


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {res.send('vaaaaaicarai')});
app.post('/signin', (req, res) => {Signin.handleSignIn(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db)});
app.get('/profile/:id', (req, res) => {Profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {Image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {Image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => {
    console.log('app is running');
})