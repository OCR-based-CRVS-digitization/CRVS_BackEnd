const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// const validate = [];

async function getToValidateList(workspaceid) {
    try {
        const formList = await prisma.pdf.findMany({
            where: {
                workspace_id: workspaceid
            }
        });
        console.log(formList);
        let validateList = [];
        for (let i = 0; i < formList.length; i++) {
            let id  = formList[i].form_id;
            
            try{
                const validate = await prisma.form_ocr_output.findUnique({
                    where: {
                        form_id: id
                    }
                });
                
                if(validate){
                    validateList.push({
                        id: validate.id.toString(),
                        name: validate.ocr_result.STUDENT_NAME.text,
                    });
                }
                
            }
            catch(err){
                console.log(`Error getting validate: ${err}`);
                return false;
            }
        }
        return validateList;
    } catch (err) {
        console.log(`Error getting validateList: ${err}`);
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
}

async function getToValidateForm(id) {
    // let id = parseBigInt(formid);
    try{
        const validate = await prisma.form_ocr_output.findUnique({
            where: {
                id: id
            }
        });
        //console.log(validate);
        const formid = validate.form_id;
        const form_url = await prisma.pdf.findUnique({
            where: {
                form_id: formid
            }
        });
        //console.log(form_url);
        if(validate && form_url){
            return {
                url:form_url.url,
                ocr_result:validate.ocr_result,
                form_id:formid
            }
        }
        // if(!form_url){
        //     console.log(`Error getting url for ID: ${formid} ${err}`);
        // }
        return false;
    }
    catch(err){
        console.log(`Error getting validate for ID: ${id} ${err}`);
        return false;
    }
}

async function updateFormPageOneDB(id,validateForm) {
    // let id = parseBigInt(formid);
    let validate = null;
    let cratedraft = null;
    try{
        validate = await prisma.form_ocr_output.update({
            where: {
                id: id
            },
            data: {
                ocr_result : validateForm
            }
        });
    }
    catch(err){
        console.log(`Error updating validate for ID: ${id} ${err}`);
        return false;
    }
    if(!validate){
        return false;
    }
    try{
        const draftid = await prisma.form_draft.findUnique({
            where: {
                form_id: validate.form_id
            }
        });
        if(draftid){
            cratedraft = await prisma.form_draft.update({
                where: {
                    id: draftid.id
                },
                data: {
                    draft : validateForm
                }
            });
        }
        else{
            cratedraft = await prisma.form_draft.create({
                data: {
                    form_id : validate.form_id,
                    eiin : validate.eiin,
                    workspace_id : valitade.workspace_id,
                    draft : validateForm
                }
            });
        }
    }
    catch(err){
        console.log(`Error creating draft for ID: ${id} ${err}`);
        return false;
    }
    if(cratedraft){
        return true;
    }
    return false;
}

module.exports = {
    getToValidateList,
    getToValidateForm,
    updateFormPageOneDB
}