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
        birthday:''
    }
}


const GET_USER = 'GET_USER';
const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME';
const UPDATE_HEIGHT = 'UPDATE_HEIGHT';
const UPDATE_WEIGHT = 'UPDATE_WEIGHT';
const UPDATE_AGE = 'UPDATE_AGE';
const UPDATE_BIRTHDAY = 'UPDATE_BIRTHDAY';


export default function reducer(state = initialState, action) {
    console.log(state)
    switch (action.type) {
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });
        case UPDATE_FIRST_NAME:
            return Object.assign({}, state, { first_name: action.payload });
        case UPDATE_LAST_NAME:
            return Object.assign({}, state, { last_name: action.payload })
        case UPDATE_AGE:
            return Object.assign({}, state, { age: action.payload })
        case UPDATE_HEIGHT:
            return Object.assign({}, state, { height_cm: action.payload })
        case UPDATE_WEIGHT:
            return Object.assign({}, state, { current_weight: action.payload })
        case UPDATE_USER +'_FULLFILLED':
            return Object.assign({}, state, {updatedUser:action.payload})
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
    let body={
        id: user.id,
        first_name:user.first_name,
        last_name:user.last_name,
        age: user.age,
        // gender: user.gender,
        // auth_id:user.auth_id,
        // email: user.email,
        height_cm: user.height_cm,
        current_weight: user.current_weight,
        // challenge_id: user.challenge_id,
        birthday:user.birthday

    }
    
    const updatedUser = axios.put(`/api/edit/${user.id}`, body).then(res=>{
        return res.data
    })
    return{
        type:UPDATE_USER,
        payload:updatedUser
    }
}
