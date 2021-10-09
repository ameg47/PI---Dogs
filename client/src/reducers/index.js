import { GET_BREEDS_ALL, GET_BREEDS_SEARCH, GET_BREED_DETAIL, GET_TEMPS, CLEANDET} from "../actions";

const initialState={
    breedList:[],
    breedDetail:{},
    temps:[]
}

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_BREEDS_ALL:
            return {
                ...state,
                breedList: action.payload
            }
        case GET_BREEDS_SEARCH:
            return {
                ...state,
                breedList: action.payload
            }
        case GET_BREED_DETAIL:
            return {
                ...state,
                breedDetail: action.payload
            }
        case GET_TEMPS:
            return {
                ...state,
                temps: action.payload
            }
        case CLEANDET:
            return {
                ...state,
                breedDetail:{}
            }
        default:
            return state
    }
}