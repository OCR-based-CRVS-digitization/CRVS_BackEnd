const { firebaseUpload } = require('../Firebase/firebaseUpload');
//const request = require('request');
const request = require('request-promise-native');


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
    const api_url = process.env.OCR_API_URL;

    const options = {
        method : 'POST',
        uri: api_url,
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            url:url,
            form_id:form_id
        }),
    };

    try {
        const response = await request(options);
        const parsedResponse = JSON.parse(response);

        if (parsedResponse.status === 200) {
            console.log('OCR API called successfully');
            console.log(parsedResponse.message);
            return true;
        } else {
            console.log(parsedResponse.message);
            return false;
        }
    } catch (error) {
        console.error('Error calling OCR API:', error.message);
        return false;
    }

}

module.exports = {
    fileUpload
}