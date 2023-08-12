const { firebaseUpload } = require('../Firebase/firebaseUpload');

async function fileUpload(req,res) {
    const workspace_id = req.body.workspace_id;
    const result = await firebaseUpload(req,res);

    if(result.code == 200){

        const { fileUploadDb } = require('../DB/fileUploadDb');

        //console.log(result.downloadURL)
        const pdf = await fileUploadDb(workspace_id,result.downloadURL);

        

        if(pdf){
            //console.log(pdf);
            res.status(200).json({ message: 'File Uploaded!' });
        }else{
            res.status(401).json({ error: 'File Upload Failed!' });
        }

    }
}

module.exports = {
    fileUpload
}