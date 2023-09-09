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


const { toValidateList } = require('../Controller/toValidateController');
router.post('/getValidateList', reqAthenticate, toValidateList);

const { toValidateForm } = require('../Controller/toValidateController');
router.post('/getValidateForm', reqAthenticate, toValidateForm);

const { updateFormPageOne } = require('../Controller/toValidateController');
router.post('/updateFormPageOne', reqAthenticate, updateFormPageOne);

const { getDraftList } = require('../Controller/draftController');
router.post('/getDraftList', reqAthenticate, getDraftList);

const { getDraftForm } = require('../Controller/draftController');
router.post('/getDraftForm', reqAthenticate, getDraftForm);

const { updateDraftPageOne } = require('../Controller/draftController');
router.post('/updateDraftPageOne', reqAthenticate, updateDraftPageOne);

const { updateForm } = require('../Controller/validatedController');
router.post('/updateForm', reqAthenticate, updateForm);

module.exports = router;