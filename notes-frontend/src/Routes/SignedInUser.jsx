import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Button from "../Components/Button";
import Modal from "../Components/Modal";
import Todos from "../Components/Todos";
import "../styles.css";
import { Context, Provider } from "../context/Provider";
let token = "";
export default function SignedInUser() {
  const { todo, edit, toggle, todos, err, dispatch } = useContext(Context);
  

  useEffect(() => {
    token ="Bearer "+localStorage.getItem("token")
    const headers = {
        
      "Content-type": "application/json",
      "auth-token": token,
    
  }
    fetch("https://notes-mern-y8iv.onrender.com/notes/", {
      method: "GET",
      headers,
    })
      .then((data) => data.json())
      .then((data) => dispatch({ type: "SET_TODOS", payload: data }))
      .catch((err) => console.log(err));
     
  }, []);

  const addTaskHandler = () => {
    if (!edit.status) {
      const payload = {
        description: todo,
      };

      const headers = {
        
          "Content-type": "application/json",
          "auth-token": token,
        
      }
      console.log({headers})
      fetch("https://notes-mern-y8iv.onrender.com/notes/new", {
        method: "POST",
        body: JSON.stringify(payload),
        headers,
      })
        .then((data) => data.json())
        .then((data) => dispatch({ type: "SET_TODOS", payload: data }))
        .catch((err) => console.log(err));
    } else {
      fetch(`https://notes-mern-y8iv.onrender.com/notes/${edit.id}`, {
        method: "PUT",
        body: JSON.stringify({ description: todo }),
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      })
        .then((data) => data.json())
        .then((data) => dispatch({ type: "SET_TODOS", payload: data }))
        .catch((err) => console.log(err));
      dispatch({ type: "SET_EDIT", payload: { status: false, id: null } });
    }
    dispatch({ type: "SET_TOGGLE", payload: false });
    dispatch({ type: "SET_TODO", payload: "" });
  };

  return (
    <Provider>
      <div className='App container mx-auto'>
        <Button text='Logout' onClick={() => {localStorage.clear();window.location.href = '/'}} />
        <Button
          text='Add task'
          onClick={() => dispatch({ type: "SET_TOGGLE", payload: true })}
          className='flex'
        />
        <Modal
          toggle={toggle}
          onClose={() => {
            dispatch({ type: "SET_TOGGLE", payload: false });
            dispatch({ type: "SET_TODO", payload: "" });
            dispatch({
              type: "SET_EDIT",
              payload: { status: false, id: null },
            });
          }}
        >
          <input
            type='text'
            placeholder='enter the task'
            value={todo}
            onChange={(e) =>
              dispatch({ type: "SET_TODO", payload: e.target.value })
            }
          />
          <Button
            text={`${edit.status ? "Update" : "Add"} task`}
            onClick={addTaskHandler}
          />
        </Modal>
        <Todos data={todos} dispatch={dispatch} />
      </div>
    </Provider>
  );
}
