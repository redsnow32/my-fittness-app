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
    getGroupsById: (req, res) => {
        const db = req.app.get('db')
        // console.log("THIS IS GET GROUPS BY ID" + " " + req.session.user.id)

        // console.log(req.session.user)

        db.get_challenge_info_by_id([req.session.user]).then(resp => {
            res.status(200).send(resp)
            // console.log("GROUPS RESPONSE", resp)
        }).catch((err) => {
            console.log(err)
            res.status(500).send("Error")
        }
            )
    },
    getAllChallenges: (req, res) => {
        const db = req.app.get('db')
        console.log("THIS IS THE GET CHALLENGE REQ.USER", req.session.user)
        db.get_all_challenges([req.session.user]).then(resp => {
            res.status.send(resp)
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    getUserChallenges: (req, res) => {
        const db = req.app.get('db')
        //change this to req.session.user
        const { id } = req.session.user
        console.log(id)
        // console.log("THIS IS THE user by challenge"+req.session.user.id)

        db.get_group_name_by_id([id]).then(resp => {
            // console.log(resp)
            res.status(200).send(resp)
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    selectChallengeId: (req, res) => {
        const db = req.app.get('db')
        const { challenge_id } = req.params
        // console.log(challenge_id)

        db.get_challenge_by_challenge_id([challenge_id]).then(resp => {

            res.status(200).send(resp)
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    addChallengeInfo: (req, res) => {
        const { challenge_id } = req.params
        const db = req.app.get('db')
        // const { id } = req.body
        // console.log(id)
        // console.log(req.body)
        // let bodyArr = req.body
        // console.log(challenge_id)
        
        // let body = req.body.reduce((result, item)=>{
        //     var key = Object.keys(item)[0]
        //     result[key] = item[key];
        //     return result
        // })
        // const { id } = body
        // console.log(id)

        let stack = []

        db.select_challenge_options_by_challenge_id([challenge_id]).then(resp => {
            console.log("THIS IS THE DB RESP" + resp)
            resp.forEach((option, i) => {
                req.body.forEach((challenge, i) => {
                    if (challenge.id == option.option_id) {
            //             stack.push(db.log_daily_values(challenge.challenge_id, option.option.id))
                    }
            //     Promise.all(stack).then(response => {
            //         console.log("Daily Values Added!")
            //         res.status(200).send(resp)
            //     }).catch((err) => {
            //         console.log(err)
            //         res.status(500).send("Error")
            //     }).catch((err) => {
            //         console.log(err)
            //         res.status(500).send("Error")
            //     })

            })
        // })
        //     req.body.challenge_options.forEach((challenge, i) => {
        //         stack.push(db.log_daily_values(challenge_id, option_id))
        // })
        // Promise.all(stack.then(response =>{
        //     console.log('options were added')
        //     res.status(200).send(resp)
        // }))

        })


    })
    // req.body.filter((option,i)=>{



    // for(let i = 0; i<option.length;i++) {
    //     if(options[i]) {
    //         console.log(options[i])
    // }
    // }

    // db.add_challenge_log([req]).then(resp=>{
    //     res.status(200).send(resp)
    // }).catch((err)=>{
    //     console.log(err)
    //     res.status(500).send(err)
    // })
}
}