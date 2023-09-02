const { firebaseUpload } = require('../Firebase/firebaseUpload');


async function fileUpload(req,res) {
    const workspace_id = req.body.workspace_id;
    const result = await firebaseUpload(req,res);

    if(result.code == 200){

        const { fileUploadDb } = require('../DB/fileUploadDb');

        //console.log(result.downloadURL)
        const pdf = await fileUploadDb(workspace_id,result.downloadURL);

        

        if(pdf){
            console.log(pdf);
            notifyOCR(pdf);
            res.status(200).json({ message: 'File Uploaded!' });
        }else{
            res.status(401).json({ error: 'File Upload Failed!' });
        }

    }
}

async function notifyOCR(pdfInfo){
    url = pdfInfo.url;
    form_id = pdfInfo.form_id.toString();
    console.log(url);
    console.log(form_id);

    //call an external api, where body = {url:url,form_id:form_id}
    // const api_url = process.env.OCR_API_URL;
    const api_url = 'http://localhost:5074';

    const axios = require('axios');

    axios.post(api_url,{
        url:url,
        form_id:form_id
    })
    .then((res) => {
        console.log('OCR API called successfully ');
    })
    .catch((error) => {
        console.error('Error calling OCR API: ',error.cause.code)
    }
    )


}

module.exports = {
    fileUpload
}