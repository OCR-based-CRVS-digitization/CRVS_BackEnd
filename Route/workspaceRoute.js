const express = require("express");
const router = express.Router();

const { reqAthenticate } = require('../authentication');

const { createWorkspace } = require('../Controller/workspaceController');
router.post('/createWorkspace', reqAthenticate, createWorkspace);

const { getAllWorkspace } = require('../Controller/workspaceController');
router.get('/getAllWorkspace', reqAthenticate, getAllWorkspace);


const { toValidateList } = require('../Controller/validateController');
router.post('/getValidateList', reqAthenticate, toValidateList);

const { toValidateForm } = require('../Controller/validateController');
router.post('/getValidateForm', reqAthenticate, toValidateForm);


module.exports = router;