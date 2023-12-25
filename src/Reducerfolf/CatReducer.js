const initialState = {
    // other initial states
    category: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CATEGORY':
        return {
          ...state,
          category: action.payload,
        };
      // other cases
      default:
        return state;
    }
  };
  export default reducer