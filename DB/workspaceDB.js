const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const workspaceModel = require('../Models/workspaceModel');

async function newWorkspace(Workspace) {
    if (!(Workspace instanceof workspaceModel)) {
        throw new Error('Invalid Workspace object');
    }
    //console.log(Workspace);
    try {
        
        await prisma.workspace.create({
            data: {
                username: Workspace.username,
                name: Workspace.name,
                class: Workspace.level,
                section: Workspace.section,
                group: Workspace.group,
                roll_start: Workspace.roll_start,
                roll_end: Workspace.roll_end,
                total: Workspace.total,
                year: Workspace.year,
                default: Workspace.main,
                description: Workspace.description
            },
        });
        return true;
    } catch (err) {
        console.log(`Error creating workspace: ${err}`);
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
}

async function getWorkspaces(username) {
    try {
        const workspace = await prisma.workspace.findMany({
            where: {
                username: username
            }
        });
        return workspace;
    } catch (err) {
        console.log(`Error getting workspace: ${err}`);
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
}


module.exports = {
   newWorkspace,
    getWorkspaces
}