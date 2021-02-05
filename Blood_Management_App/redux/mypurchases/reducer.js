import { UPDATE_FIELDS_REG, STATE_CLEANUP,BLUR_FIELDS_REG,
    UPDATE_MYPURCHASE_ARRAY, 
    UPDATE_SUCCESS} from './actionTypes'
  
  const initialState = {
      list:[],
  };
  
  const mypurchasesReducer  = (state = initialState, action) => {
      switch (action.type) {
         
          case STATE_CLEANUP: {
              console.log('Cleaning state');
              return initialState;
            }
  
          case UPDATE_MYPURCHASE_ARRAY:{
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
  
  export default mypurchasesReducer