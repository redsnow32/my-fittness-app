require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const ctrl = require('./ctrl/ctrl');
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, DOMAIN, CLIENTID, CLIENT_SECRET, CALLBACK_URL} = process.env;

const app = express();
app.use(bodyParser.json());

app.use(session({
    secret:SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

massive(CONNECTION_STRING).then(db=> {
    app.set('db', db)
});
passport.use(new Auth0Strategy({
    domain:DOMAIN,
    clientID:CLIENTID,
    clientSecret:CLIENT_SECRET,
    callbackURL:CALLBACK_URL,
    scope: 'openid profile id email'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db')
    
    const {sub, given_name, family_name, gender} = profile._json;
    db.find_user([sub]).then(response=> {
        if(response[0]) {
            done(null, response[0].id);
        } else {
            db.create_user([given_name, family_name, gender, sub]).then(response=> {
            
                done(null, response[0].id);
            })
        }
    })
}));

//////////////

app.use((req, res, next) => {
    if (!req.session.user) {
        req.session.user = {
            id:4,
            first_name: "stuffify",
            last_name:"you",
            age:34,
            gender:"male",
            auth_id:"google-oauth2|104169181473731414256",
            email: "B32alls@gmail.com",
            current_height: "234",
            // profile_picture: "http://www.placekitten.com/200/250",
        }
    }

    next()
})




//////////////////////////////////////////

passport.serializeUser((id, done)=> {
    done(null, id)
})
passport.deserializeUser((id, done)=> {
    const db = app.get('db');
    db.find_logged_in_user([id]).then(res=> {
        done(null, res[0])
    })
});

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect:'http://localhost:3000/#/dashboard'
}))
////
//change req.user to req.session.user so you don't have to login and out all the time. 
//
//Change this back when you're done updating the site;
////
app.get('/auth/me', (req, res)=> {
    if(!req.session.user) {
        res.status(404).send('Not Logged In')
    } else {
        res.status(200).send(req.session.user)
    }
})

app.get('/logout', (req,res)=> {
    req.logOut();
    res.redirect('http://localhost:3000/')
})
app.put('/api/edit/:id', ctrl.updateUser);


app.listen(SERVER_PORT, () => {console.log(`Listening on port:${ SERVER_PORT }`)})