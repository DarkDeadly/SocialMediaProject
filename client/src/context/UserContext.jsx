import {  useReducer } from "react";
import { createContext } from "react";
import axios from "axios";

export const userContext = createContext();

const initialState = {
  error: null,
  user: null,
  loading: false,
};

const ReducerFn = (state, action) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: null };
    case "AUTH_COMPLETE":
      return { ...state, loading: false, user: action.payload };
    case "AUTH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "GET_USER" :
        return {...state , user : action.payload}
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ReducerFn, initialState);

  const login = async (credential) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await axios.post(
        import.meta.env.VITE_USERBACKEND + "/login",
        credential
      );
      console.log(response.data)
       dispatch({ type: "AUTH_COMPLETE", payload: response.data.user });
      return true
    } catch (error) {
       dispatch({
        type: "AUTH_ERROR",
        payload: "Login Error please Check your Credential",
      });
      return false
    }
  };
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        import.meta.env.VITE_USERBACKEND + "/logout"
      );
      return dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const registerUser = async (credential) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await axios.post(
        import.meta.env.VITE_USERBACKEND + "/register",
        credential
      );
    console.log(response.data)
    
      dispatch({ type: "AUTH_COMPLETE", payload: response.data.user });
      return true
    } catch (error) {
      console.log(error)
      dispatch({
        type: "AUTH_ERROR",
        payload: error.response?.data?.message,
      });
      return false
    }
  };


  const getUser = async( ) => {
    axios.defaults.withCredentials = true
    try {
        const response = await axios.get(import.meta.env.VITE_USERBACKEND + "/getuser")
        return dispatch({type :"GET_USER" , payload :response.data })
    } catch (error) {
      console.log(error)  
    }
  }

  

  return (
    <userContext.Provider value={{ ...state, login, logout, registerUser , getUser }}>
      {children}
    </userContext.Provider>
  );
};
