import {
    GET_LIST_PROMOTIONS,
    GET_LIST_PROMOTIONS_ERR,
    ADD_PROMOTION,
    ADD_PROMOTION_ERR,
    UPDATE_PROMOTION,
    UPDATE_PROMOTION_ERR,
    DELETE_PROMOTION,
    DELETE_PROMOTION_ERR
} from '../actions/types'

export default function(state = [], action){
    const { type, payload } = action
    switch(type){
        case GET_LIST_PROMOTIONS : 
            return payload;
        
        case GET_LIST_PROMOTIONS_ERR : 
            return payload;

        case ADD_PROMOTION : 
            return [
                ...state.slice(0, 0),
                payload,
                ...state.slice(0)
            ] 

        case ADD_PROMOTION_ERR :
            return payload

        case UPDATE_PROMOTION : 
            return state.map((item, index) => {
                if (item.id !== payload.id) {
                return item
                }

                return {
                ...item,
                ...payload
                }
            })

        case UPDATE_PROMOTION_ERR : 
            return payload
            
        case DELETE_PROMOTION : 
            return payload

        case DELETE_PROMOTION_ERR :
            return payload

        default: 
            return state;
    }
}