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
                        name: validate.ocr_result.STUDENT_NAME,
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

async function getToValidateForm(formid) {
    //let id = parseBigInt(formid);
    try{
        const validate = await prisma.form_ocr_output.findUnique({
            where: {
                id: formid
            }
        });
        if(validate){
            //change validate.id to toString()
            return validate.ocr_result;
        }
    }
    catch(err){
        console.log(`Error getting validate for ID: ${id} ${err}`);
        return false;
    }
}

module.exports = {
    getToValidateList,
    getToValidateForm
}