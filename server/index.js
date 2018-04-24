require('dotenv').config();
const axios = require('axios');
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const randtoken = require('rand-token');
const challenge_ctrl = require('./ctrl/challenge_ctrl');
const ctrl = require('./ctrl/ctrl');
const cors = require('cors');
// const AWS = require('aws-sdk')
const S3 = require('./S3.js');
const ScaleS3 = require('./ScaleS3');
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, DOMAIN, CLIENTID, CLIENT_SECRET, CALLBACK_URL, AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, AWS_REGION, AWS_BUCKET } = process.env;


const app = express();
app.use(express.static(`${__dirname}/../build`));
app.use(cors());
app.use(bodyParser.json());


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
});
passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENTID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile id email'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db')

    const { sub, given_name, family_name, gender } = profile._json;
    db.find_user([sub]).then(response => {
        if (response[0]) {
            done(null, response[0].id);
        } else {
            db.create_user([given_name, family_name, gender, sub]).then(response => {

                done(null, response[0].id);
            })
        }
    })
}));

////////////// 
//////!req.user) {
//         req.user

app.use((req, res, next) => {
    if (!req.user) {
        req.user = {
            id: 4,
            first_name: "Brandon",
            last_name: "Allred",
            age: 34,
            gender: "male",
            auth_id: "google-oauth2|104169181473731414256",
            email: "B32alls@gmail.com",
            height: '',
            current_weight: '',
            current_height: "234",
            challenge_id: '',
            birthdate: '',
            profile_picture: '',
        }
    }

    next()
})




//////////////////////////////////////////

// passport.serializeUser((id, done) => {
//     done(null, id)
// })
// passport.deserializeUser((id, done) => {
//     const db = app.get('db');
//     db.find_logged_in_user([id]).then(res => {
//         done(null, res[0])
//     })
// });

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.REACT_APP_SUCCESSREDIRECT
    // 'http://localhost:3000/#/dashboard'
}))
////
//change req.user to req.user so you don't have to login and out all the time. referrenced above
// in the app.use you 

// you changed all of your req.user to req.user in order to to all of your testing


//IMPORTANT!!!!!!!!!!!!
//when you're don change find and replace all with req.user
//
//Change this back when you're done updating the site;
////
app.get('/auth/me', (req, res) => {
    if (!req.user) {
        res.status(404).send('Not Logged In')
    } else {
        // console.log(req.user)
        res.status(200).send(req.user)
        // res.status(200).send(req.user)
    }
})

app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect(process.env.REACT_APP_LOCALHOST)
    // ('http://localhost:3000/')
})
app.put('/api/edit/:id', ctrl.updateUser);
app.put('/api/create_challenge', ((req, res, next) => {

    const { id } = req.user
    const { group_name, start_date, end_date, reward_amount, water_intake, caloric_intake, daily_weight, exercise, collection_type, payment_required } = req.body
    let token = randtoken.generate(16)
    const db = req.app.get('db')

    let stack = []
    db.create_new_challenge([token, id, group_name, start_date, end_date, reward_amount]).then(resp => {
        req.body.options.forEach((option, i) => {
            const { value } = option
            stack.push(db.input_option(token, option.id))
            stack.push(db.input_point_values( value, option.id, token))
        })
        Promise.all(stack).then(response => {
            console.log('Options were added!')
            res.status(200).send(resp)
        }).catch((err) => {
            console.log(err)
            res.status(500).send("Error")
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).send("Error")
    })
}))
 

app.get('/api/create_challenge/options', challenge_ctrl.getAllOptions)
app.get('/api/create_challenge/points', challenge_ctrl.getAllPoints)
app.get('/api/dashboard/groups', challenge_ctrl.getGroupsById)
app.get('/api/dashboard/get_all_challenges', challenge_ctrl.getAllChallenges)
app.get('/api/dashboard/group_name', challenge_ctrl.getUserChallenges)
// app.get('/api/group/:challenge_id', challenge_ctrl.getChallengeById)
app.get('/api/daily/:challenge_id', challenge_ctrl.selectChallengeId)
app.put('/api/daily/daily_log/:challenge_id', challenge_ctrl.addChallengeInfo)
app.put('/api/join_challenge/:challenge_id', challenge_ctrl.joinChallenge)
app.get('/api/group/:challenge_id', challenge_ctrl.getAllUsersOnChallenge)
// app.get('/api/group/:challenge_id', challenge_ctrl.getAllUsersPointsOnChallege)
app.get('/api/daily/daily_points/:challenge_id', challenge_ctrl.getUserPoints)
app.get('/api/daily/images/:challenger_id', challenge_ctrl.getUserPhotos)
app.delete('/api/daily/delete/:challenge_id', challenge_ctrl.deleteChallenge)

S3(app)
ScaleS3(app)

app.listen(SERVER_PORT, () => { console.log(`Listening on port:${SERVER_PORT}`) });