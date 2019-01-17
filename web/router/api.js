var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var models = require('../../libs/models');
var jsonParser = bodyParser.json();
var _ = require('underscore');
var security = require('../../libs/security');
// define the about route
router.post('/auth', jsonParser, function (req, res) {


    res.json(security.authorizationManager.validateCredential(
        models.copy(
            new models.security.credential(), req.body)
            )
            );

})
router.post('/validate', jsonParser, function (req, res) {
    let b = models.copy(
        new models.security.authorization(), req.body);
console.log(b);
    let validate = security.authorizationManager.validateAuthorization(
            models.copy(
                new models.security.authorization(), req.body));

    res.json( {success: validate} 
     );

})
module.exports = router