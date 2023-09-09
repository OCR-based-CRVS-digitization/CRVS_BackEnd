const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updatedFormDB(formid,validatedForm){
    try{
        const form = await prisma.form_ocr_output.findUnique({
            where: {
                form_id : formid
            }
        });
        if(form){
            await prisma.form_validated.create({
                data: {
                    form_id: formid,
                    validated: validatedForm,
                    workspace_id: form.workspace_id,
                    eiin: form.eiin
                }
            });
            
            await prisma.form_ocr_output.delete({
                where: {
                    form_id: formid
                }
            });
            
            const draft = await prisma.form_draft.findUnique({
                where: {
                    form_id: formid
                }
            });
            if(draft){
                await prisma.form_draft.delete({
                    where: {
                        form_id: formid
                    }
                });
            }
            return true;
        }
        else{
            return false;
        }

    }
    catch(err){
        console.log(`Error updating form: ${err}`);
        return false;
    }
    finally{
        await prisma.$disconnect();
    }
}

module.exports = {
    updatedFormDB
}