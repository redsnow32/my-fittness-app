import axios from 'axios';

const initialState = {
    user:{}
}


const GET_USER = 'GET_USER';
const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME';
const UPDATE_USER = 'UPDATE_USER';



export default function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_USER + '_FULFILLED':
        return Object.assign({}, state, {user:action.payload});
        case UPDATE_FIRST_NAME:
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
// export function updateFirstName(firstName) {
//     const user = axios.put(`/api/edit?firstName=${firstName}`).then(res=> {
//         return res.data;
//     })
//     return {
//         type: UPDATE_FIRST_NAME,
//         payload:user
//     }
// }
export function updateUser(user) {
    const userUpdate = axios.put('/api/edit/:user').then(res=>{
        return res.data
    })
    return {
        type: UPDATE_USER,
        payload:user
    }
}
/// set a new user object in the edit and send that object to the reducer where it can then send that 
//object to the DB and update the DB.