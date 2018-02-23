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
        console.log(req.user)
        console.log(req.session.passport.user)

        db.get_challenge_info_by_id([req.session.passport.user]).then(resp=>{
            res.status(200).send(resp)
            console.log("GROUPS RESPONSE", resp)
        }).catch((err) => {
            console.log(err)
            res.status(500).send("Error")
        }
    )
}
}