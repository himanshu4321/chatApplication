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
router.get('/', function(req, res, next) {
    if(req.session.userName){
        res.sendFile('/var/www/html/chatApplication/views/chats.html');
    }else{
        res.redirect("/");
    }  
});

router.get('/chatUsers', function(req, res, next) {
    if(req.session.userName){
        connect.then(db=>{
            User.find({},
                function(err,response){
                    console.log(response);
                    if(err){
                        res.json(err);
                    }else{
                        res.json(response);
                }
            })
        });
    }else{
        res.redirect("/");
    }  
});

module.exports = router;