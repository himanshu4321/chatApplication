var express     = require('express');
var router      = express.Router();
const path      = require('path');
const User      = require("../models/User");
const connect   = require("../config/dbconnect");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));



/* GET home page. */
router.post('/', function(req, res, next) {
    const userName      = req.body.userName;
    const userPassword  = req.body.password;
    connect.then(db=>{
        User.find({name:userName,password:userPassword}, function (err, response) {
            req.session.userName = userName;
            res.json(response);
          }).catch(err=>{
            res.json(err);
          });
    })
});

module.exports = router;
