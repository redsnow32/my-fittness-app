module.exports = {
    getAllOptions: (req, res) => {
        const db = req.app.get('db')

        db.get_all_options().then(resp => {
            // console.log(resp)
            res.status(200).send(resp)
        }).catch((err) => res.status(500).send(err))
    },
    getAllPoints: (req, res) => {
        const db = req.app.get('db')

        db.get_all_point_options().then(resp => {
            console.log(resp)
            res.status(200).send(resp)
        }).catch((err) => {
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
        console.log(req.body)
        const db = req.app.get('db')

        let stack = []
        db.select_challenge_options_by_challenge_id([challenge_id]).then(resp => {
            resp.forEach((option, i) => {
                console.log(option +"THIS IS THE OPTION")
                req.body.forEach((challenge, i) => {
                    console.log(challenge.value)
                    if (option.option_id == challenge.id) {
                        console.log(option.option_id +"this is the option", challenge,"this is the challenge")
                        stack.push(db.log_daily_values(challenge_id, id, challenge.id, challenge.value))
                        console.log(resp)
                    }
                })
            })
            Promise.all(stack).then(response => {
                console.log('Daily Log Added')
                response.map((points, i) => {
                    console.log(points)
                    points.map((opt, i) => {
                        console.log(opt)
                        if(opt.option_value!==''||null) {
                            console.log(opt
                            // db.update_points([])
                            )}
                    })
                    // db.add_points([]).then(re=>{

                    // })
                })
                res.status(200).send(response)
                console.log(response + "THIS IS THE DAILY INPUT RESPONSE")
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
        console.log(challenge_id)
        const { id } = req.session.user

        let stack = []
        ///CHANGE THIS CHALLENGE ID BACK TO challenge_id

        db.get_challenge_by_challenge_id([challenge_id]).then(resp => {
            resp.forEach((option, i) => {
                stack.push(db.join_challenge_by_challenge_id([challenge_id, id, option.option_id]))
            })
            Promise.all(stack).then(resp => {
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
    getAllUsersOnChallege: (req, res) => {
        const db = req.app.get('db');
        const { challenge_id } = req.params
        console.log(challenge_id)

        db.get_join_challeng_by_id([challenge_id]).then(resp => {
            resp.map((user, i) => {
                resp.map((user, i) => {
                })
            })
            res.status(200).send(resp)
        }).catch((err) => {
            console.log(err)
            res.status(500).send('ERROR')
        })
    },
    getAllUsersPointsOnChallege: (req, res) => {
        const db = req.app.get('db')
        const { challenge_id } = req.params
        const { id } = req.session.user

        db.get_user_points_by_challenge_id([challenge_id]).then(resp => {
            resp.map((user, i) => {
                console.log(user + "THIS IS THE USER")
            })
        })
    }
}