import axios from 'axios'

const initialState = {
    challenge: {
        challenge_id:''
    }
}


const CREATE_NEW_CHALLENGE_ID = 'CREATE_NEW_CHALLENGE_ID'

export function challenge_reducer(state = initialState, action) {
    switch (action.payload) {
        case CREATE_NEW_CHALLENGE_ID:
            return Object.assign({}, state, { challenge_id: action.payload })
        default:
            return state
    }

}

export function createChallenge(challenge_id) {
    return {
        type: CREATE_NEW_CHALLENGE_ID,
        payload: challenge_id
    }
}