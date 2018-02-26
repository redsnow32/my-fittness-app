module.exports = {
    getAllOptions: (req, res) => {
        const db = req.app.get('db')

        db.get_all_options().then(resp => {
            // console.log(resp)
            res.status(200).send(resp)
        }).catch((err) => res.status(500).send(err))
    },
    // insertOptions: (req, res) => {
    //     const db = req.app.get('db')
    //     let challengeOption = req.body.sort().filter((id, i) => {
    //         if (id) {
    //             db.input_option_one(['newsdfasdftuff', id]).then(resp => {
    //                 res.status(200).send()
    //             }).catch((err) => res.status(500).send(err))
    //         }
    //     })

    // },
    getGroupsById: (req,res)=>{
        const db = req.app.get('db')
        // console.log("THIS IS GET GROUPS BY ID" + " " + req.session.user.id)

        // console.log(req.session.user)

        db.get_challenge_info_by_id([req.session.user]).then(resp=>{
            res.status(200).send(resp)
            // console.log("GROUPS RESPONSE", resp)
        }).catch((err) => {
            console.log(err)
            res.status(500).send("Error")
        }
    )
},
getAllChallenges:(req,res)=>{
    const db = req.app.get('db')
    console.log("THIS IS THE GET CHALLENGE REQ.USER", req.session.user)
    db.get_all_challenges([req.session.user]).then(resp=>{
        res.status.send(resp)
    }).catch((err)=>{
        console.log(err)
        res.status(500).send(err)
    })
},
    getUserChallenges: (req, res)=>{
        const db = req.app.get('db')
        //change this to req.session.user
        const { id } = req.session.user
        // console.log(id)
        // console.log("THIS IS THE user by challenge"+req.session.user.id)

        db.get_group_name_by_id([id]).then(resp=>{
            // console.log(resp)
            res.status(200).send(resp)
        }).catch((err)=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    selectChallengeId:(req,res)=>{
        const db = req.app.get('db')
        const { challenge_id } = req.params
    
        db.get_challenge_by_challenge_id([challenge_id]).then(resp=>{
            
            res.status(200).send(resp)
        }).catch((err)=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    addChallengeInfo:(req,res)=>{
        const db = req.app.get('db')

        db.add_challenge_log().then(resp=>{
            res.status(200).send(resp)
        }).catch((err)=>{
            console.log(err)
            res.status(500).send(err)
        })
    }
}