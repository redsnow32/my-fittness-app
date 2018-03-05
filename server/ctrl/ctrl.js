module.exports = {
    updateUser: (req, res, next) => {
        console.log(req.body)
        console.log("ID", req.params.id)
        console.log("REQ BODY", req.body)
        const db = req.app.get('db');
        const { id, first_name, last_name, age, gender, email, height_cm, current_weight, birthday } = req.body

        db.update_user([id, first_name, last_name, age, gender, email, height_cm, current_weight, birthday])
            .then((resp) => {
                console.log("UPDATE RESP", resp)
                res.status(200).send(resp)
            }).catch((err) => {
                console.log(err)
                res.status(500).send("Error")
            })
    }

}