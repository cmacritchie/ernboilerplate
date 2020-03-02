import { toastSuccess, toastError } from './toasts'
import { history } from '../components/App'

export const FETCH_USER = 'FETCH_USER'
export const FETCH_CHALLENGERS = 'FETCH_CHALLENGERS'
export const NEW_CHALLENGER = 'NEW_CHALLENGER'
export const DISCONNECT_CHALLENGER = 'DISCONNECT_CHALLENGER'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'




//////////////Actions
export const actionCreators = {
    fetchUser: (user) => dispatch => {
        dispatch({
            type: FETCH_USER, 
            payload:user
        });
    },
    fetchChallengers: (users) => dispatch => {
        dispatch({
            type: FETCH_CHALLENGERS, 
            payload:users
        });
    },
    newChallenger: (user) => dispatch => {
        dispatch({
            type: NEW_CHALLENGER, 
            payload:user
        });
    },
    disconnectChallenger: (user) => dispatch => {
        dispatch({
            type: DISCONNECT_CHALLENGER,
            payload: user
        })
    }
}

/////////////////////////Reducer

const initialState = {
    isAuthenticated: false,
    loading: true,
    me: null,
    challengers:{}
}

export const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case FETCH_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                me: payload
            }
        case FETCH_CHALLENGERS:
            return {
                ...state,
                challengers:{...state.challengers, ...payload}
            }
        case NEW_CHALLENGER:
            return {
                ...state,
                challengers:{...state.challengers, [payload.socketId]:payload}
            }
        case DISCONNECT_CHALLENGER:
            return {
                ...state,
                challengers: Object.keys(state.challengers).filter(socketId => socketId !== payload.socketId)
                    .reduce((acc, element) => {
                        return {
                            ...acc,
                            [element]:state.challengers[element]
                        }
                    }, {})
            }
        default:
            return state
    }
}