var express = require('express');
var app = express();
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('server/routes');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var PORT = process.env.PORT || 5555;

app.use(bodyParser.json());

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Used for production build
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    return done(null, { username: 'rafoli' }); 
  }
));

app.use(cors());
app.options('/user/me', cors());
app.get('/user/me', function (req, res) {
  console.log('/user/me');
  res.json({"username":"rafoli"});
});

app.listen(PORT, function() {
    console.log('Server running on ' + PORT);
});

// Fake data
var fakePlaces = [{
    "name": "Parraxaxá",
    "slug": "parraxaxa",
    "logo": "https://pbs.twimg.com/profile_images/1372422288/parraxaxa_low.jpg"
  },
  {
    "name": "Bode Entre Amigos",
    "slug": "bode-entre-amigos",
    "logo": "https://pbs.twimg.com/profile_images/1704845581/PERFIL_400x400.jpg",
    "menu": [{name: "Vatapa", price: 120}, {name: "Feijoada", price: 12.3}, {name: "Bode", price: 55.6}]
}];

app.get('/places.json', function (req, res) {
  console.log('places.json');
  res.json({places: fakePlaces});
});

app.get('/places/bode-entre-amigos.json', function (req, res) {
  console.log('/slug/places.json');
  res.json({place: fakePlaces[1]});
});