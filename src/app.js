const express = require('express');
const {router} = require('./routes/routes.js')
const {mutationHandler,getMutationsHandler} = require('./handlers/handle.js')

const app = express();

app.post("/test",mutationHandler)

// Middleware para aceptar archivos json.
app.use(express.json());
app.use(router)

module.exports = {app};