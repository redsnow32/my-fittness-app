module.exports = {
    // updateFirstName: (req, res, next)=> {
    //     console.log(req)
    //     const db = req.app.get('db');
        
        // const { query } = req
        // const { id } =req.user
        // console.log(query.firstName)
        // console.log(req.user.id)

        // db.update_user_first_name(query.firstName, id).then( () => res.status(200).send() )
        // .catch( () => res.status(500).send() );
        // console.log(res)
    updateUser: (req, res, next)=> {
        console.log(req.body)
        console.log(req.user)
        // console.log("ID", req.params.id)
        // console.log("REQ BODY", req.body)
       const db = req.app.get('db');
    //    const { id, first_name, last_name, age, height_cm, current_weight, birthday} = req.body
       const {id, first_name, last_name, age, height_cm, current_weight, birthday}= req.user
       
    //    switch(req.body) {
    //        case first_name:
    //        return 
    //    }

    db.update_user([id, first_name, last_name, age, height_cm, current_weight, birthday])
    .then( (resp)=>{
        console.log("UPDATE RESP", resp)
        res.status(200).send(resp)
    }).catch(()=> res.status(500).send("Error"))
        
    }
}