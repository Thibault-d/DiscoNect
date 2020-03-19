const createError   = require('http-errors');
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const mongoose      = require('mongoose');
const SpotifyWebApi = require('spotify-web-api-node');
const dotenv        = require('dotenv').config();
const session       = require("express-session");
const MongoStore    = require("connect-mongo")(session);
const bcrypt        = require("bcrypt");
const saltRounds    = 10;

// routes
const indexRouter   = require('./routes/index');
const usersRouter   = require('./routes/users');
const artistsRouter = require('./routes/artists');
const venuesRouter  = require('./routes/venues');
const signupRouter  = require('./routes/signup');
const loginRouter   = require('./routes/login');
const app           = express();


const monogUrl      = 'mongodb+srv://alejandro:1234@cluster0-onpcf.mongodb.net/test?retryWrites=true&w=majority';
const mongoLocal    = 'mongodb://localhost/disconnect';

// Conexion with BD Mongo
mongoose
  .connect(monogUrl, {useNewUrlParser: true} )
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 60 * 1000 }, // 60 seconds
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    resave: true,
    saveUninitialized: false,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/artists', artistsRouter);
app.use('/venues', venuesRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

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
