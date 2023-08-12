const workspaceModel = require('../Models/workspaceModel');

async function createWorkspace(req,res) {
    user = res.locals.username;
    const Workspace = new workspaceModel({
        username: user,
        name: req.body.name,
        level: req.body.level,
        section: req.body.sec,
        group: req.body.group,
        roll_start: req.body.start,
        roll_end: req.body.end,
        total: req.body.total,
        year: req.body.year,
        main: req.body.main,
        description: req.body.description
    });

    //console.log(Workspace);

    try{
        const { newWorkspace } = require('../DB/workspaceDB');
        const isCreated = await newWorkspace(Workspace);
        if(isCreated){
            res.status(200).json({ message: 'Workspace Created!' });
        }else{
            res.status(401).json({ error: 'Workspace Creation Failed!' });
        }
    }
    catch(err){
        console.log(`Error creating workspace: ${err}`);
        res.status(500).json({ error: 'Internal error, please try again.' });
    }

}

async function getAllWorkspace(req,res) {
    user = res.locals.username;
    try{
        const { getWorkspaces } = require('../DB/workspaceDB');
        const workspaces = await getWorkspaces(user);
        if(workspaces){
            
            const workspaceList = workspaces.map((workspace) => new workspaceModel({
                workspace_id: workspace.workspace_id,
                username: workspace.username,
                name: workspace.name,
                class: workspace.class,
                section: workspace.section,
                group: workspace.group,
                roll_start: workspace.roll_start,
                roll_end: workspace.roll_end,
                total: workspace.total,
                year: workspace.year,
                main: workspace.default,
                description: workspace.description
            }));

            res.status(200).json({ workspaces: workspaceList });

        }else{
            res.status(401).json({ error: 'Workspace Fetch Failed!' });
        }
        
    }
    catch(err){
        console.log(`Error getting workspace: ${err}`);
        res.status(500).json({ error: 'Internal error, please try again.' });
    }
}


    

module.exports = {
    createWorkspace,
    getAllWorkspace
}