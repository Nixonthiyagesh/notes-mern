import { useContext, useEffect } from "react";
import Button from "../Components/Button";
import Modal from "../Components/Modal";
import Todos from "../Components/Todos";
import "../styles.css";
import { Context } from "../context/Provider";
import {axiosInstance} from "../axios";
import { useNavigate } from "react-router-dom";

const useSignedInUser = () => {
  const { todo, edit, toggle, todos, err, dispatch } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    axiosInstance.defaults.headers.common["auth-token"] = `Bearer ${token}`;
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/notes/");
        dispatch({ type: "SET_TODOS", payload: response.data });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [navigate, dispatch]);

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const onChangeTodo = (e) =>
    dispatch({ type: "SET_TODO", payload: e.target.value });

  const onAddTask = async () => {
    if (!edit.status) {
      try {
        const response = await axiosInstance.post("/notes/new", { description: todo });
        dispatch({ type: "SET_TODOS", payload: response.data });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await axiosInstance.put(`/notes/${edit.id}`, { description: todo });
        dispatch({ type: "SET_TODOS", payload: response.data });
        dispatch({ type: "SET_EDIT", payload: { status: false, id: null } });
      } catch (err) {
        console.log(err);
      }
    }
    dispatch({ type: "SET_TOGGLE", payload: false });
    dispatch({ type: "SET_TODO", payload: "" });
  };

  const onCloseModal = () => {
    dispatch({ type: "SET_TOGGLE", payload: false });
    dispatch({ type: "SET_TODO", payload: "" });
    dispatch({ type: "SET_EDIT", payload: { status: false, id: null } });
  };

  return {
    onLogout,
    onChangeTodo,
    onAddTask,
    onCloseModal,
    toggle,
    todo,
    todos,
    err,
  };
};

export default function SignedInUser() {
  const {
    onLogout,
    onChangeTodo,
    onAddTask,
    onCloseModal,
    toggle,
    todo,
    todos,
    err,
  } = useSignedInUser();
  const { dispatch, edit } = useContext(Context);

  return (
      <div className='App container mx-auto'>
        <Button text='Logout' onClick={onLogout} />
        <Button
          text='Add task'
          onClick={() => dispatch({ type: "SET_TOGGLE", payload: true })}
          className='flex'
        />
        <Modal toggle={toggle} onClose={onCloseModal}>
          <input
            type='text'
            placeholder='enter the task'
            value={todo}
            onChange={onChangeTodo}
          />
          <Button
            text={`${edit.status ? "Update" : "Add"} task`}
            onClick={onAddTask}
          />
        </Modal>
        <Todos data={todos} />
      </div>
  );
}
