import axios from 'axios';


const initialState = {
    user:{}
}


const GET_USER = 'GET_USER';



export default function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_USER + '_FULFILLED':
        return Object.assign({}, state, {user:action.payload});
        default:
        return state
    }
}

export function getUser() {
    const user = axios.get('/auth/me').then(res=> {
        return res.data;
    })
    return {
        type: GET_USER,
        payload: user
    }
}