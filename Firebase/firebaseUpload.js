// Import the functions you need from the SDKs you need
require('dotenv').config();
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSENGER_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// module.exports = {
//     firebaseConfig
// }

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

//const storage = app.storage().ref(); 
//global.XMLHttpRequest = require("xhr2");



function getCurrentTimeFormatted() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = now.getFullYear();

    const formattedTime = `${hours}:${minutes}:${seconds}-${day}-${month}-${year}`;
    return formattedTime;
}

async function firebaseUpload(req,res){
    console.log("file received ",req.file.originalname);
    try {
        console.log('getting current time...');
        const dateTime = getCurrentTimeFormatted();

        // get the file name and extension
        console.log('getting file name and extension...');
        if(!req.file){
            return {
                code: 400,
                message: 'No file received',
            };
        }
        var filename_parts = req.file.originalname.split(".")
        console.log("filename parts :",filename_parts);

        // get the length of that array
        var extension_length = filename_parts.length
        console.log("extension length :",extension_length);

        // get the extension by selecting the last element in the array
        var extension = filename_parts[extension_length - 1]
        console.log("extension :",extension);

        // create the file name part by concatenating the file name from the array
        var file_name = ""
        for (var i = 0; i < extension_length - 1; i++) {
            file_name += filename_parts[i]
        }
        console.log("file name :",file_name);

        // create the file name with the file_name , date and extension
        var file_name_with_date = file_name + "_" + dateTime + "." + extension 
        console.log("file name with date :",file_name_with_date);

        // // check on variable is_template
        // const folder_ref = is_template ? 'templates' : 'forms';
        console.log('getting file reference...');
        // const file_ref = storage.child('pdf/').child(`${file_name_with_date}`);

        const fileRef = ref(storage, file_name_with_date);

        console.log('creating file metadata...');
        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };
        console.log('Uploading file...');
        // Upload the file in the referenced path
        // const uploadTask = await file_ref.put(req.file.buffer, metadata);
        const uploadTask = uploadBytesResumable(fileRef, req.file.buffer, metadata);
        await uploadTask;
        console.log('File uploaded successfully!');
        // Grab the public URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        console.log('File successfully uploaded.');
        return {
            code: 200,
            message: 'file uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        };
        
    } catch (error) {
        return {
            code: 400,
            message: `Error uploading file: ${error}`,
        };
    }

}

module.exports = {
    firebaseUpload
}