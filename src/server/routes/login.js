var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/', function(req, res, next) {

  passport.authenticate('local', function(err, user, info) {
    if (err)
      return next(err);

    // Set HTTP status code `200 OK`
    res.status(200);

    // Return the user object
    res.send({username: 'rafoli'});
  }) (req, res, next);
});
  

module.exports = router;