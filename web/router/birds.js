var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
// middleware that is specific to this router
 
router.use(function timeLog(req, res, next) {
    console.log('url: ', req.originalUrl);
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
router.get('/', function (req, res) {
   res.json({
       hi: 'bird'
   });
})
// define the about route
router.post('/about', jsonParser, function(req, res) {
     
    res.json({hi:'bird'});
})

module.exports = router