import {combineReducers} from 'redux';

//? importing all the reducers.
import loginReducer from './login/reducer';
import regReducer from './register/reducer';
import regIndReducer from './registerInd/reducer';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  loginFormState: loginReducer,
  regFormState: regReducer,
  regIndFormState: regIndReducer,
  authState: authReducer,
});

export default rootReducer;
