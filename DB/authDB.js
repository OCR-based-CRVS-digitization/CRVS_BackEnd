const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function authenticateUser(username, password) {
    try {

        const user = await prisma.users.findUnique({
            where: { username },
        });

        if (!user || user.password !== password) {
            return false;
        }

        return true;
    } catch (err) {
        console.log(`Error authenticating user: ${err}`);
        return false;
    }
    finally{
        await prisma.$disconnect();
    }
}

async function authenticateAdmin(eiin, password) {
    try {

        const admin = await prisma.admin.findUnique({
            where: { eiin },
        });

        if (!admin || admin.password !== password) {
            return false;
        }

        return true;
    } catch (err) {
        console.log(`Error authenticating admin: ${err}`);
        return false;
    }
    finally{
        await prisma.$disconnect();
    }
}

async function getEIIN(username) {
    try {

        const user = await prisma.users.findUnique({
            where: { username },
        });

        if (!user) {
            return false;
        }

        return user.eiin.toString();
    } catch (err) {
        console.log(`Error getting EIIN: ${err}`);
        return false;
    }
    finally{
        await prisma.$disconnect();
    }
}


module.exports = {
    authenticateUser,
    authenticateAdmin,
    getEIIN
}