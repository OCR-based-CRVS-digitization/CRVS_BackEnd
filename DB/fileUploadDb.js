const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fileUploadDb(id,URL) {
    console.log(id)
    console.log(URL)
    try {
        const result = await prisma.pdf.create({
            data: {
                workspace_id : id,
                url : URL
            },
        });
        //get from_id for newly uploaded pdf
        //console.log(result);
        return result;
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