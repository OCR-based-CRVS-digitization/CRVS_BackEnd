const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fileUploadDb(id,URL) {
    try {
        const createdpdf = await prisma.pdf.create({
            data: {
                workspace_id : id,
                url : URL
            },
        });
        //get from_id for newly uploaded pdf
        return createdpdf.form_id;
    } catch (err) {
        console.log(`Error Inserting Url: ${err}`);
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
}

module.exports = {
    fileUploadDb
}