
    // db.create_new_challenge([token, user.id, group_name, start_date, end_date, reward_amount ]).then(resp => {
    //     console.log("CREATE CHALLENGE", resp)
    //     res.status(200).send(resp)
    // }).catch(() => res.status(500).send("Error"))
// }))

// app.post('/api/create_challenge', challenge_ctrl.generateNewChallengeID);

// AWS.config.update({
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY,
//     AWS_REGION: AWS_REGION
// })

// const S3 = new AWS.S3();

// app.post('/api/photo/:userID', (req, res) => {
//     console.log(req)
//     const buffer = new Buffer(req.body.file.replace(/^data.*;base64,/, ""), 'base64');
//     const params = {
//         bucket: AWS_BUCKET,
//         body: buffer,
//         key: req.body.filename,
//         contentType: req.body.filetype,
//         ACL: 'public-read'
//     };
//     console.log(buffer)

//     S3.upload(params, (err, data) => { // image is uploaded to s3
//         if (err) return res.status(500).send(err);
//         else res.status(200).send(data);
//     });
// });


// module.exports = {
//     generateNewChallengeID: (req, res, next) => {
//         const { db } = req.app.get('db')
//         console.log(req.session.user)
//         //use .includes to find the challenge id use while loop
//         //

//         db.create_new_challenge_id([req.session.user]).then(resp => {
//             console.log("CREATE CHALLENGE", resp)
//             res.status(200).send(resp)
//         }).catch(() => res.status(500).send("Error"))
//     }
// }




// const { challengeData } = this.props
        // function generateChallengeID() {
        //     var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        //     var challenge_length = 10;
        //     var randID = '';
        //     for (var i = 0; i < challenge_length; i++) {
        //         var rnum = Math.floor(Math.random() * chars.length);
        //         randID += chars.substring(rnum, rnum + 1);

        //     }
        //     return randID
        // }
        // let newChallengeID = generateChallengeID()


            // handleCreateChallengeClick(e) {
    //     function generateChallengeID() {
    //         var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    //         var challenge_length = 10;
    //         var randID = '';
    //         for (var i = 0; i < challenge_length; i++) {
    //             var rnum = Math.floor(Math.random() * chars.length);
    //             randID += chars.substring(rnum, rnum + 1);

    //         }
    //         console.log(randID)
    //         return randID  
    //     }
    //     let newChallengeID = generateChallengeID()
    //     console.log(newChallengeID)
    //     this.setState({challengeID:newChallengeID})
        
    // }