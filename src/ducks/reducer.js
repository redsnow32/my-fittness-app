import axios from 'axios';

const initialState = {
    user: {
        first_name: '',
        last_name: '',
        age: '',
        gender: '',
        email: '',
        height_cm: '',
        current_weight: '',
        challenge_id: '',
        birthday: ''
    },
    challenge: {
        challenge_id: '',
        user_id: '',
        group_name: '',
        start_date: '',
        end_date: '',
        daily_points: '',
        total_points: '',
        reward_amount: ''
    },
    options: [

    ],
    selectedChallengeId:'',
}

const GET_USER = 'GET_USER';
const UPDATE_USER = 'UPDATE_USER';
const CREATE_NEW_CHALLENGE_ID = 'CREATE_NEW_CHALLENGE_ID';
const CREATE_OPTIONS = 'CREATE_OPTIONS';
const GET_CHALLENGE_ID = 'GET_CHALLENGE_ID';

export default function reducer(state = initialState, action) {
    console.log(state)
    switch (action.type) {
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });
        case UPDATE_USER + '_FULLFILLED':
            return Object.assign({}, state, { updatedUser: action.payload })
        case CREATE_NEW_CHALLENGE_ID:
            return Object.assign({}, state, { challenge: action.payload })
        case CREATE_OPTIONS + '_FULLFILLED':
            return Object.assign({}, state, { options: action.payload })
        case GET_CHALLENGE_ID:
            return Object.assign({}, state, { selectedChallengeId: action.payload})
        default:
            return state
    }
}


export function getUser() {
    const user = axios.get('/auth/me').then(res => {
        return res.data;
    })
    return {
        type: GET_USER,
        payload: user
    }
}

export function updateUser(user) {
    // console.log(user)
    let body = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
        // gender: user.gender,
        // auth_id:user.auth_id,
        // email: user.email,
        height_cm: user.height_cm,
        current_weight: user.current_weight,
        // challenge_id: user.challenge_id,
        birthday: user.birthday

    }

    const updatedUser = axios.put(`/api/edit/${user.id}`, body).then(res => {
        return res.data
    })
    return {
        type: UPDATE_USER,
        payload: updatedUser
    }
}

export function createChallenge(challenge, options) {
    // console.log(challenge, options)
    let body = {
        challenge_id: '',
        user_id: '',
        group_name: challenge.groupName,
        start_date: challenge.startDate,
        end_date: challenge.endDate,
        collection_type: challenge.collectionType,
        daily_points: '',
        total_points: '',
        reward_amount: challenge.rewardAmount,
        options:options

    }
    const newChallengeID = axios.put(`/api/create_challenge`, body).then(res => {
        return res.data
    })
    return {
        type: CREATE_NEW_CHALLENGE_ID,
        payload: challenge
    }
}


export function createOptions(option) {
    console.log(option)
const selectedChallenge = axios.put(`/api/create_challenge`, option).then(res=>{
    console.log(option)
    return res.data
})
return {
    type: CREATE_OPTIONS,
    payload: option
}
}

export function selectChallenge(selectedChallengeId) {
    console.log(selectedChallengeId)
    // const selectedChallengeId = axios.get(`/api/group/${challenge}`).then(res=>{
    //     return res.data
    // })
    return {
        type: GET_CHALLENGE_ID,
        payload: selectedChallengeId
    }

}

export function dailyLog(log) {
    axios.put(`/api/daily/daily_log`).then(res=>{
        return res.data
    })
}