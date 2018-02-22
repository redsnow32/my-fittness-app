module.exports={
    getAllOptions: (req,res)=>{
        const db = req.app.get('db')

        db.get_all_options().then(resp=> {
            console.log(resp)
            res.status(200).send(resp)
        }).catch((err)=>res.status(500).send(err))
    }
}