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

async function getWorkspaceDB(workspace_id) {
    try {
        const workspace = await prisma.workspace.findUnique({
            where: {
                workspace_id: workspace_id
            }
        });
        const uploaded = await prisma.pdf.findMany({
            where: {
                workspace_id: workspace_id
            }
        });
        const waiting = await prisma.form_ocr_output.findMany({
            where: {
                workspace_id: workspace_id
            }
        })
        const validated = await prisma.form_validated.findMany({
            where: {
                workspace_id: workspace_id
            }
        });
        const draft = await prisma.form_draft.findMany({
            where: {
                workspace_id: workspace_id
            }
        });
        return {
            workspace: workspace,
            uploaded: uploaded.length,
            validated: validated.length,
            draft: draft.length,
            waiting: waiting.length
        };
    } catch (err) {
        console.log(`Error getting workspace: ${err}`);
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
}

async function updateWorkspaceDB(workspace_id, Workspace) {
    if (!(Workspace instanceof workspaceModel)) {
        throw new Error('Invalid Workspace object');
    }
    try {
        await prisma.workspace.update({
            where: {
                workspace_id: workspace_id
            },
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
            }
        });
        return true;
    }
    catch (err) {
        console.log(`Error updating workspace: ${err}`);
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
}




module.exports = {
   newWorkspace,
    getWorkspaces,
    getWorkspaceDB,
    updateWorkspaceDB
}