//code for context 

import { createContext, useContext } from "react";
import { useReducer } from "react";
import reducer from "./reducer";            

const initialState = {
    todo: "",   
    edit: { status: false, id: null },
    toggle: false,
    todos: [],
    err: "",
};

export const Context = createContext(null);
export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{...state, dispatch}}>{children}</Context.Provider>
  );
}   

export const useNotesContext = () => {
    return useContext(Context)
  }

