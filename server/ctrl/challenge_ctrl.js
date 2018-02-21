// module.exports = {
//     generateNewChallengeID: (req, res, next) => {
//         const { db } = req.app.get('db')
//         console.log(req.user)
//         //use .includes to find the challenge id use while loop
//         //

//         db.create_new_challenge_id([req.user]).then(resp => {
//             console.log("CREATE CHALLENGE", resp)
//             res.status(200).send(resp)
//         }).catch(() => res.status(500).send("Error"))
//     }
// }