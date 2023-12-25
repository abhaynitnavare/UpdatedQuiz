const initialState = {
    // other initial states
    user: null,
  };
  
  const userreducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          username: action.payload,
        };
      // other cases
      default:
        return state;
    }
  };
  export default userreducer