//This goes on the server

// /////
app.use((req, res, next) => {
    if (!req.session.user) {
        req.session.user = {
            user_id: 1,
            user_name: "testing",
            email: "B32alls@gmail.com",
            name: " ",
            profile_picture: "http://www.placekitten.com/200/250"
        }
    }

    next()
})
/////////

// in your controller, use this so you don't have to login and out of auth 0 everytime you need to login. 
// do a search and replace all req.session.user to console.log(req.session.user)