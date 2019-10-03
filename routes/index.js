var express = require('express');
var router = express.Router();
const path = require('path');
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
  console.log(req.session);
  //res.render('index', { title: 'Express' });
  if(req.session.userName){
    res.redirect('/chats');
  }else{
    res.sendFile('/var/www/html/chatApplication/views/index.html');
  } 
});

module.exports = router;
