var express = require('express');
var app = express();
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('server/routes');
var uid = require('rand-token').uid;
var User = require('server/db/db').User;

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;


var PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Passport


// Used for production build
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new BasicStrategy(
  function(userid, password, done) {
    console.log(userid + ' : ' + password)
    User.findOne( { 'email': userid }, function(err, user) {

      if (err || !(user)) { return done(null, false); }

      if (user.password != password) { return done(null, false); }

      var token = uid(16);
      user.token = token;
      return done(null, user); 
    });
  	

  }
));

app.use(cors());
app.options('/user/me', cors());
app.get('/user/me',
	passport.authenticate('basic', { session: false }),
  	function(req, res) {
    	res.json(req.user);
	}
);

app.listen(PORT, function() {
    console.log('Server running on ' + PORT);
});