require('dotenv').config();

const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION
})

const S3 = new AWS.S3();

function uploadPhoto(req, res) {
    const db = req.app.get('db')
    const { name, selectedChallengeId } = req.params
    //need to change this to req.user
    const { id } = req.user

    let photo = req.body,
        buffer = new Buffer(photo.file.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
        params = {
            Bucket: process.env.AWS_BUCKET,
            Body: buffer,
            Key: photo.filename,
            ContentType: photo.filetype,
            ACL: 'public-read'
        }

    S3.upload(params, (err, data) => {
        console.log(params)
        if (err) {
            console.log(err)
        } else {
            response = data.Location, code = 200
            console.log(response)
            (response = data.Location, code = 200)
            res.status(code).send(response)
            console.log('S3 response', data)
            db.upload_scale_img([selectedChallengeId, id, name, response]).then(resp=>{
                res.status(200).send(resp)
            }).catch((err)=>{
                console.log(err)
                res.status(500).send(err)
            }) 
            
        }
       
    })
    ///start herer challenge_id, user_id, option_id, option_value
}

module.exports = function (app) {
    app.post('/api/scale_img_upload/:name/:selectedChallengeId', uploadPhoto)
}