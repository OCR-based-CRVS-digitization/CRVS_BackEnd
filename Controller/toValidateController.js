//This file is linked with workspaceRoute.js
//The function here all are called from workspaceRoute.js

async function toValidateList(req,res) {
    workspaceid = req.body.workspace_id;
    console.log(req.body);
    console.log(workspaceid);
    // if(!workspaceid){
    //     res.status(401).json({ error: 'Give valid workspace ID!' });
    // }
    try{
        const { getToValidateList } = require('../DB/toValidateDB');
        const validateList = await getToValidateList(workspaceid);
        if(validateList){
            res.status(200).json({validateList});
        }else{
            res.status(401).json({ error: 'Error Fetching ToValidatelist!' });
        }
    }
    catch(err){
        console.log(`Getting toValidate List Failed: ${err}`);
        res.status(500).json({ error: 'Internal error, please try again.' });
    }
}

async function toValidateForm(req,res) {
    formid = req.body.form_id;
    console.log(formid);
    try{
        const { getToValidateForm } = require('../DB/toValidateDB');
        const validateForm = await getToValidateForm(formid);
        if(validateForm){
            res.status(200).json({validateForm});
        }else{
            res.status(401).json({ error: 'Error Fetching ToValidateForm!' });
        }
    }
    catch(err){
        console.log(`Getting toValidate Form Failed: ${err}`);
        res.status(500).json({ error: 'Internal error, please try again.' });
    }
}

async function updateFormPageOne(req,res) {
    const formid = req.body.form_id;
    // console.log(formid);
    const validateForm = req.body.ocr_result;
    const eiin = req.body.eiin;
    const workspace_id = req.body.workspace_id;
    // console.log(validateForm);
    console.log(req.body)
    try{
        const { updateFormPageOneDB } = require('../DB/toValidateDB');
        const form = await updateFormPageOneDB(formid,validateForm,eiin,workspace_id);
        if(form){
            res.status(200).json("Form Updated Successfully!");
        }else{
            res.status(401).json({ error: 'Error Updating Form in Database -- from controller!' });
        }
    }
    catch(err){
        console.log(`Updating Form Failed: ${err}`);
        res.status(500).json({ error: 'Internal error, please try again.' });
    }
}


module.exports = {
    toValidateList,
    toValidateForm,
    updateFormPageOne
}