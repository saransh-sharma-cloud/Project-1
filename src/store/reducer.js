   const initialState = {
    users:[],
    loggedInUser:null,
   }


   const reducer = (state = initialState,action) => {
    switch(action.type){
        case "REGISTER":
            return {
                      ...state,
                      users:[...state.users,action.payload]
            }
            default:
                return state;
    }
   }