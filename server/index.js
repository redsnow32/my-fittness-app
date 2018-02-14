require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
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
    scope: 'openid profile id'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db')

    console.log(profile)
    
    const {sub, given_name, family_name, gender} = profile._json;
    db.find_user([sub]).then(response=> {
        console.log(response)
        if(response[0]) {
            done(null, response[0].id);
        } else {
            db.create_user([given_name, family_name, gender, sub]).then(response=> {
                done(null, response[0].id);
            })
        }
    })
}));

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
    successRedirect:'http://localhost:3000#/dashboard'
}))

app.get('/auth/me', (req, res)=> {
    console.log(req.user)
    if(!req.user) {
        res.status(404).send('Not Logged In')
    } else {
        res.status(200).send(req.user)
    }
})

app.get('/logout', (req,res)=> {
    req.logOut();
    res.redirect('http://localhost:3000/')
})


app.listen(SERVER_PORT, () => {console.log(`Listening on port:${ SERVER_PORT }`)})