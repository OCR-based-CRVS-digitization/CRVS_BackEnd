const { get } = require('prompt');

async function updateForm(req,res){
    const formid = req.body.form_id;
    const validatedForm = req.body.form_info;

    const { updatedFormDB } = require('../DB/validatedDB');
    const form = await updatedFormDB(formid,validatedForm);
    if(form){
        res.status(200).json("Form Updated Successfully!");
    }else{
        res.status(401).json({ error: 'Error Updating Form in Database -- from controller!' });
    }

}

async function getValidatedList(req,res){
    const workspaceid = req.body.workspace_id;
    console.log("workspaceid ",workspaceid);
    try{
        const { getValidatedListDB } = require('../DB/validatedDB');
        const validatedList = await getValidatedListDB(workspaceid);
        if(validatedList){
            console.log(validatedList);
            res.status(200).json(validatedList);
        }else{
            res.status(401).json({ error: 'Error Fetching ValidatedList!' });
        }
    }
    catch(err){
        console.log(`Getting Validated List Failed: ${err}`);
        res.status(500).json({ error: 'Internal error, please try again.' });
    }
};


module.exports = {
    updateForm,
    getValidatedList
}