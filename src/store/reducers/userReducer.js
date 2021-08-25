const defaultState = {
    loggedIn: false,
    user: {}
}

const userReducer = (state = defaultState, action) => {
    console.log("in reducer");
    switch(action.type){
        case "SET_USER":
            return {
                loggedIn: true,
                user: action.payload
            }
       
        default: return state
    }
}

export default userReducer