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
const UPDATE_USER = 'UPDATE_USER';

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });
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
