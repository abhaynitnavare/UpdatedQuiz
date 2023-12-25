export const LoginSuccess = () => {

    return {
    
    type: "LOGIN_SUCCESS",
    
    };
    
    };
    
    export const Logout = () => {
    
    return {
    
    type: "LOGOUT",
    
    };
    
    };


    export const setCategory = (category) => {
        return {
          type: 'SET_CATEGORY',
          payload: category,
        };
      };

      export const setUser = (user) => {
        return {
          type: 'SET_USER',
          payload: user,
        };
      };

