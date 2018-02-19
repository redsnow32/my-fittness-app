require('dotenv').config();
const { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, AWS_REGION, AWS_BUCKET } = process.env

const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId:AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    AWS_REGION:AWS_REGION
})

const s3 = newAWS.S3();

function uploadPhoto(req,res) {
    // req.body={
    //     file: (Base64),
    //     filename:'',
    //     filetype:''

        let photo = req.body,
        newImg= new Buffer(photo.file.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
        params = {
            bucket: AWS_BUCKET,
            body: newImg,
            key:photo.filename,
            contentType:photo.filetype,
            ACL:'public-read'
        }
        console.log(newImg)
        
        s3.upload(params,(err,data)=>{
            console.log(err,data)
            let response, code 
            err ? (resp = err, code = 500) : (resp = data, code = 200)
            res.status(code).send(resp)
            console.log(('S3 response', data))
        })
    }
