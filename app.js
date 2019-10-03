var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var chatRouter = require('./routes/chat');
var logoutRouter = require('./routes/logout');
var app = express();

var session = require('express-session');
var cookieParser = require('cookie-parser');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));


var http = require('http').Server(app);
var io  =  require('socket.io')(http);
var connectedUsers = {};
io.on('connection',function(socket){
   /*Register connected user*/
       socket.on('register',function(username){
           socket.username = username;
           connectedUsers[username] = socket;
       });
        console.log(connectedUsers);
       /*Private chat*/
      socket.on('private_chat',function(data){
               const to = data.to,
               message = data.message;

         if(connectedUsers.hasOwnProperty(to)){
            connectedUsers[to].emit('private_chat',{
               //The sender's username
               username : socket.username,

               //Message sent to receiver
               message : message
            });
         }

      });
   });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/chats', chatRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
