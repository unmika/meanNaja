import axios from 'axios';
import { 
    GET_LIST_PROMOTIONS,
    GET_LIST_PROMOTIONS_ERR,
    ADD_PROMOTION,
    ADD_PROMOTION_ERR,
    UPDATE_PROMOTION,
    UPDATE_PROMOTION_ERR,
    DELETE_PROMOTION,
    DELETE_PROMOTION_ERR
 } from './types'

 export const getListPromotions = () => {
    return dispatch => {
        axios.get('http://localhost:3002/promotions').then((res)=>{
            dispatch({
                type: GET_LIST_PROMOTIONS,
                payload: res.data
            });
        }).catch((e)=>{
            dispatch({
                type: GET_LIST_PROMOTIONS_ERR,
                payload: []
            });
        })
    }
}

export const addPromotion = (promotion) => {
    console.log('addddd',promotion)
    return (dispatch) => {
        axios.post('http://localhost:3002/promotions', promotion).then((res)=>{
            console.log(res.data)
            dispatch({
                type: ADD_PROMOTION,
                payload: res.data
            });
        }).catch((e)=>{
            dispatch({
                type: ADD_PROMOTION_ERR,
                payload: 'add promotion fail'
            });
        })
    }
}

export const updatePromotion = (id, promotion) => {
    return (dispatch) => {
        axios.put(
            `http://localhost:3002/promotions/${id}`,
            promotion
        ).then((res)=>{
            dispatch({
                type: UPDATE_PROMOTION,
                payload: res.data
            });
        }).catch((e)=>{
            dispatch({
                type: UPDATE_PROMOTION_ERR,
                payload: 'update promotion fail'
            })
        })
    }
}

export const deletePromotion = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3002/promotions/${id}`).then((res)=>{
            dispatch({
                type: DELETE_PROMOTION,
                payload: res.data
            });
        }).catch((e)=>{
            dispatch({
                type:  DELETE_PROMOTION_ERR,
                payload: 'delete promotion fail'
            })
        })
    }
}