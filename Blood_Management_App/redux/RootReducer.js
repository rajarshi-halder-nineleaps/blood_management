import {combineReducers} from 'redux';
import loginReducer from './login/reducer';
import regReducer from './register/reducer';
import regIndReducer from './registerInd/reducer';

const rootReducer = combineReducers({
  loginFormState: loginReducer,
  regFormState: regReducer,
  regIndFormState: regIndReducer,
});

export default rootReducer;
