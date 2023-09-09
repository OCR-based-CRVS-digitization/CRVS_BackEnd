
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

module.exports = {
    updateForm
}