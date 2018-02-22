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
        challenge_id:'',
        user_id:'',
        group_name:'',
        start_date:'',
        end_date:'',
        water_intake:false,
        calorie_intake:false,
        daily_weight:false,
        weight_loss:false,
        exercise:false,
        collection_type:'',
        collection_required:false,
        daily_points:'',
        total_points:'',
        reward_amount:''
    }
}


const GET_USER = 'GET_USER';
const UPDATE_USER = 'UPDATE_USER';
const CREATE_NEW_CHALLENGE_ID = 'CREATE_NEW_CHALLENGE_ID'

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });
        case UPDATE_USER + '_FULLFILLED':
            return Object.assign({}, state, { updatedUser: action.payload })
        case CREATE_NEW_CHALLENGE_ID:
            return Object.assign({}, state, { challenge_id: action.payload })
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
    console.log(user)
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

export function createChallenge(challenge) {
console.log(challenge)
    let body = {
        challenge_id:'',
        user_id:'',
        group_name:challenge.groupName,
        start_date:challenge.startDate,
        end_date:challenge.endDate,
        water_intake:challenge.waterIntake,
        calorie_intake:challenge.calorieIntake,
        daily_weight:challenge.dailyWeight,
        weight_loss:challenge.weightLoss,
        exercise:challenge.exercise,
        collection_type:challenge.collectionType,
        payment_required:challenge.paymentRequired,
        daily_points:'',
        total_points:'',
        reward_amount:challenge.rewardAmount,

    }
    const newChallengeID = axios.put(`/api/create_challenge`, body).then(res=>{
        res.data
    })
    return {
        type: CREATE_NEW_CHALLENGE_ID,
        payload: challenge
    }
}
