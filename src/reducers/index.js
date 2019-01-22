import { combineReducers } from 'redux';
import PromoReducer from './PromoReducer';

const rootReducer = combineReducers({
    promotions: PromoReducer
  });
  
  export default rootReducer;