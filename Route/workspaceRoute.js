const express = require("express");
const router = express.Router();

const { reqAthenticate } = require('../authentication');

const { createWorkspace } = require('../Controller/workspaceController');
router.post('/createWorkspace', reqAthenticate, createWorkspace);

const { getWorkspace } = require('../Controller/workspaceController');
router.post('/getWorkspace', reqAthenticate, getWorkspace);

const { updateWorkspace } = require('../Controller/workspaceController');
router.post('/updateWorkspace', reqAthenticate, updateWorkspace);

const { getAllWorkspace } = require('../Controller/workspaceController');
router.get('/getAllWorkspace', reqAthenticate, getAllWorkspace);


const { toValidateList } = require('../Controller/validateController');
router.post('/getValidateList', reqAthenticate, toValidateList);

const { toValidateForm } = require('../Controller/validateController');
router.post('/getValidateForm', reqAthenticate, toValidateForm);

const { updateForm } = require('../Controller/validateController');
router.post('/updateForm', reqAthenticate, updateForm);

module.exports = router;