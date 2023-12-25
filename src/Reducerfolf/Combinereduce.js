import { combineReducers } from 'redux';
import authReducer from './Reducer';
import reducer from './CatReducer';
import userreducer from './Userreduce';
const rootReducer = combineReducers({
auth: authReducer,
Cat:reducer,
User:userreducer
// other reducers if any
});

export default rootReducer;