import { CHECK_USER_LOGIN } from "./actionTypes";

const initialState = {
    isLoggedIn: false,
    userToken: "",
}

const loginReducer = (state = initialState, action) =>{
    switch(action.type){
        case CHECK_USER_LOGIN: return {userToken: action.token, isLoggedIn: userToken? true : false};
    }
};

export default loginReducer;
