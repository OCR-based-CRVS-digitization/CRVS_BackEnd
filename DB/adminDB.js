const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function userAvailable(username) {
    try {
        const user = await prisma.users.findUnique({
            where: { username },
        });

        return user === null;
    }
    catch (err) {
        console.log(`Error checking user availability: ${err}`);
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
}


async function createUser(eiin, username, password) {
    try {
        await prisma.users.create({
            data: {
                eiin,
                username,
                password,
            },
        });
        return true;
    } catch (err) {
        console.log(`Error creating user: ${err}`);
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
}


module.exports = {
    userAvailable,
    createUser
}