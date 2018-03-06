module.exports = {
    getAllOptions: (req, res) => {
        const db = req.app.get('db')

        db.get_all_options().then(resp => {
            res.status(200).send(resp)
        }).catch((err) => res.status(500).send(err))
    },
    getAllPoints: (req, res) => {
        const db = req.app.get('db')

        db.get_all_point_options().then(resp => {

            res.status(200).send(resp)
        }).catch((err) => {
            console.log(err)
            res.status(500).send('ERROR')
        })
    },
    getGroupsById: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.user
        console.log(req.user.id)

        db.get_challenge_info_by_id([id]).then(resp => {
            res.status(200).send(resp)
        }).catch((err) => {
            console.log(err)
            res.status(500).send("Error")
        }
            )
    },
    getAllChallenges: (req, res) => {
        const db = req.app.get('db')
        db.get_all_challenges([req.user]).then(resp => {
            res.status.send(resp)
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    getUserChallenges: (req, res) => {
        const db = req.app.get('db')
        //change this to req.user
        // console.log(req.user, "THIS IS THE USER")
        const { id } = req.user
        // console.log(id)
        // console.log("THIS IS THE user by challenge"+req.user.id)

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
        // console.log(challenge_id, "THIS is THE CAHLLEN ID FOR SELECTED")

        db.get_challenge_by_challenge_id([challenge_id]).then(resp => {
            res.status(200).send(resp)
            // console.log(resp, "THIS IS THE RESP")
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    addChallengeInfo: (req, res) => {
        const { challenge_id } = req.params
        const { id } = req.user
        // console.log(req.body, "THIS WAS HIT")
        const db = req.app.get('db')

        let stack = []
        db.select_challenge_options_by_challenge_id([challenge_id]).then(resp => {
            resp.filter((option, i) => {
                req.body.filter((challenge, i) => {
                    // console.log(challenge, "THIS IS THE CHALLENGE===========================================")
                    if (option.option_id == challenge.id) {
                        // console.log(option.option_id +"this is the option", challenge,"this is the challenge")
                        stack.push(db.log_daily_values(challenge_id, id, challenge.id, challenge.value))
                        // console.log(resp)
                    }
                })
            })
            Promise.all(stack).then(response => {
                // console.log(response + "THIS IS THE DAILY INPUT RESPONSE")
                // response.map((user, i) => {
                //     if (user.value) {
                //         db.select_challenge_options_by_challenge_id([user.user_id, user.challenge_id]).then(resp => {
                //             console.log(resp, "THIS IS THE RESP FROM POINTS")
                //             return user
                // })
                //         db.insert_daily_points([])

                // }
                // console.log(user, "--------------------------------------iiiiuyujhdgfsdsaa")
                // return user
                // })
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
        const { id } = req.user
        console.log(challenge_id, "THIS WAS HIT FOR THE USER")
        let stack = []
        ///CHANGE THIS CHALLENGE ID BACK TO challenge_id
        console.log(challenge_id)
        db.get_challenge_by_challenge_id([challenge_id]).then(resp => {
            resp.forEach((option, i) => {
                // if(option.id === id && challenge_id == option.challenge_id) {
                stack.push(db.join_challenge_by_challenge_id([challenge_id, id]))
                // }
            })
            Promise.all(stack).then(resp => {
                console.log('Joined Challenge Successfully!')
                res.status(200).send(resp)
                // console.log(resp)
            }).catch((err) => {
                console.log(err)
                res.status(500).send('ERROR')
            })
        }).catch((err) => {
            console.log(err)
            res.status(500).send('ERROR')
        })

    },
    getAllUsersOnChallenge: (req, res) => {
        const db = req.app.get('db');
        const { challenge_id } = req.params


        db.get_join_challenge_by_id([challenge_id]).then(resp => {
            res.status(200).send(resp)
        }).catch((err) => {
            console.log(err)
            res.status(500).send('ERROR')
        })
    },
    getUserPoints: (req, res) => {

        const db = req.app.get('db')
        const { challenge_id } = req.params
        const { id } = req.user

        db.select_daily_points([challenge_id, id]).then(resp => {
            // resp.map((user, i) => {
            res.status(200).send(resp)
            // })
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    getUserPhotos: (req, res) => {
        const { id } = req.user
        const { challenge_id } = req.params
        const db = req.app.get('db')

        db.get_user_photos_by_challenge([id, challenge_id]).then(resp => {
            console.log(resp)
            res.status(200).send(resp)
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    deleteChallenge: (req, res) => {
        const { id } = req.user
        const { challenge_id } = req.params
        console.log(req.params)
        const db = req.app.get('db')

        // console.log(challenge_id, "THIS IS THE CHALLENGE_ID")

        db.delete_challenge_by_id([challenge_id]).then(resp => {
            res.status(200).send(resp) 
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
    }
    // getUserPoints: (req,res) => {
    //     const db = req.app.get('db')

    //     db.select_daily_points([challenge_id, id]).then(resp=>{
    //         resp.map((user,i)=>{
    //             res.status(200).send(resp)
    //         })
    //     })
    // }
}