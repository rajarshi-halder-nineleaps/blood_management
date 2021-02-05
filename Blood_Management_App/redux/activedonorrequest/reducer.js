import { UPDATE_FIELDS_REG, STATE_CLEANUP,BLUR_FIELDS_REG,
    UPDATE_ACTIVEDONOR_ARRAY, 
    UPDATE_SUCCESS} from './actionTypes'
  
  const initialState = {
      list:[],
  };
  
  const activedonorReducer  = (state = initialState, action) => {
      switch (action.type) {
         
          case STATE_CLEANUP: {
              console.log('Cleaning state');
              return initialState;
            }
  
          case UPDATE_ACTIVEDONOR_ARRAY:{
            console.log("updating")
            
            return{
              ...state,
              list:action.array,
              
            }
            
            
            
          }
          case UPDATE_SUCCESS:{
            console.log("done")
          }
        
            default:
              return state;
      }    
  }
  
  export default activedonorReducer