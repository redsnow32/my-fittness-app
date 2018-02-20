require('dotenv').config();
const { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, AWS_REGION, AWS_BUCKET } = process.env

const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    AWS_REGION: AWS_REGION
})

const S3 = new AWS.S3();

    app.post('/api/photo/:userID', (req, res) => {
        const buffer = new Buffer(req.body.file.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
        const params = {
            bucket: AWS_BUCKET,
            body: buffer,
            key: req.body.filename,
            contentType: req.body.filetype,
            ACL: 'public-read'
        };
        console.log(buffer)

        S3.upload(params, (err, data) => { // image is uploaded to s3
            if (err) return res.status(500).send(err);
            else res.status(200).send(data);
        });
    });

module.exports = function (app) {
    app.post('/api/edit', uploadPhoto)
}
