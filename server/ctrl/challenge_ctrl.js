module.exports = {
    getAllOptions: (req, res) => {
        const db = req.app.get('db')

        db.get_all_options().then(resp => {
            // console.log(resp)
            res.status(200).send(resp)
        }).catch((err) => res.status(500).send(err))
    },
    getAllPoints:(req, res)=> {
        const db = req.app.get('db')

        db.get_all_point_options().then(resp=>{
            console.log(resp)
            res.status(200).send(resp)
        }).catch((err)=>{
            console.log(err)
            res.status(500).send('ERROR')
        })
    },
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
        const { id } = req.session.user
        console.log(id + "   THIS OS DESTRUCTURED CHAL ID")
        const db = req.app.get('db')

        let stack = []
        db.select_challenge_options_by_challenge_id([challenge_id]).then(resp => {
            resp.map((option, i) => {
                req.body.map((challenge, i) => {
                    if (option.option_id == challenge.id) {
                        console.log(challenge.id + "CHALLENGEID")
                        console.log(option.option_id + "OPTIONID")
                        console.log(challenge.value + "VALUE")
                        stack.push(db.log_daily_values(challenge_id, id, challenge.id, challenge.value))
                    }
                })
            })
            Promise.all(stack).then(response => {
                console.log('Daily Log Added')
                res.status(200).send(response)
            }).catch((err) => {
                console.log(err)
                res.status(500).send("ERROR")
            })
        }).catch((err) => {
            console.log(err)
            res.status(500).send("ERROR")
        })
    },
    joinChallenge: (req, res) => {
        const db = req.app.get('db')
        const { challenge_id } = req.params
        const { id } = req.session.user
        console.log(challenge_id)

        let stack = []
        db.get_challenge_by_challenge_id([challenge_id]).then(resp => {
            resp.map((option, i) => {
                // if(challenge_id === option.challenge_id && id === option.user_id){
                //     console.log("THIS IS TRUE!")
                //     res.status(404).send("user already exists")
                // } 
                challenge_id === option.challenge_id && id === option.user_id ? stack.push(res.status(202).send("User Already Existst On Challenge")) :
                stack.push(db.join_challenge_by_challenge_id([challenge_id, id, option.option_id]))
                
            })

            Promise.all(stack).then(resp => {
                res.status(202).send("User Already Existst On Challenge")
                console.log('Joined Challenge Successfully!') 
                res.status(200).send(resp)
                console.log(resp)
            }).catch((err) => {
                console.log(err)
                res.status(500).send('ERROR')
            })
        }).catch((err) => {
            console.log(err)
            res.status(500).send('ERROR')
        })
    },
    getAllUsersOnChallege:(req,res)=>{
        const db = req.app.get('db');
        const { challenge_id } = req.params
        console.log(challenge_id)

        // let stack = []
        db.get_join_challeng_by_id([challenge_id]).then(resp=>{
         resp.map((user, i)=>{
             return user
         })
            res.status(200).send(resp)
        }).catch((err)=>{
            console.log(err)
            res.status(500).send('ERROR')
        })
    }
}