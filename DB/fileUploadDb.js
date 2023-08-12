const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fileUploadDb(id,URL) {
    try {
        await prisma.pdf.create({
            data: {
                workspace_id : id,
                url : URL
            },
        });
        return true;
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