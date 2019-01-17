"use strict";
const config = require("./libs/configuration");
const models = require("./libs/models");
const express = require('express')
const app = express()
const port = config.web.port;
const birds = require('./web/router/birds')
const defaultRoutes = require('./web/router/default')
const apiRoutes = require('./web/router/api')
const security = require('./libs/security');
security.authorizationManager.addCredential('test', 'password');

app.use('/static', express.static('web/public'))
app.use('/',defaultRoutes);
app.use('/birds',birds);
app.use('/api',apiRoutes);

 

 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))