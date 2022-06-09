const express = require('express');
const route = express.Router();
const { get_actions, post_actions } = require('../controllers/auditController'); 

route.get('/admin/audit', get_actions);
route.post('/admin/audit',post_actions);

module.exports = route;