const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const { Login } = require('./models/loginModel');
const { url } = require('inspector');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'images')));

mongoose.connect('mongodb://localhost:27017/ecommerceDB').then(()=>{
    console.log('Connected to MongoDB');
})

app.get('/',(req,res)=>{
    res.send('Welcome to the server!');
})
app.post('/submit', (req, res) => {
    const { username, password } = req.body;
    console.log(`Username: ${username}, Password: ${password}`);
    Login.findOne({ username: username })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    console.log('Login successful');
                   
                    res.status(200).redirect('http://127.0.0.1:5501/pages/index.html');
                } else {
                    console.log('Incorrect password');
                    res.status(401).send('Incorrect password');
                }
            }
            else {
                console.log('User not found');
            }
        })
        .catch(err => {
            console.error('Error finding user:', err);
        });
    
});
app.post('/Logout', (req, res) => {
    // Handle logout logic here
    console.log('User logged out');
    res.status(200).redirect('http://127.0.0.1:5501/pages/Register.html');
});  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    });