module.exports = {
    updateFirstName: (req, res, next)=> {
     
        const db = req.app.get('db');
        const { query } = req
        const { id } =req.user
        console.log(query.firstName)
        console.log(req.user.id)

        db.update_user_first_name(query.firstName, id).then( () => res.status(200).send() )
        .catch( () => res.status(500).send() );
        console.log(res)
    },
    updateUser: (req, res, next)=> {
        const { id } = req.user

        // db.update_user()
    }
}