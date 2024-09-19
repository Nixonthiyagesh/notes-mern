import { memo, useContext } from "react";
import Todo from "../Todo";
import "./index.css";
import { Context } from "../../context/Provider";
import {axiosInstance} from "../../axios";

const Todos = ({ data }) => {
  const token = localStorage.getItem("token");
  const { dispatch } = useContext(Context);
  const deleteHandler = async (id) => {
    try {
      const { data } = await axiosInstance.delete(`notes/${id}`, {
        headers: {
          "auth-token":
            "Bearer " + token,
        },
      });
      dispatch({ type: "SET_TODOS", payload: data });
    } catch (err) {
      console.log(err);
    }
  }

  const editHandler = (id, data) => {
    dispatch({ type: "SET_TOGGLE", payload: true });
    const oldTodos = data;
    const todoValue = oldTodos?.find((val) => val._id === id)?.description;
    dispatch({ type: "SET_TODO", payload: todoValue });
    dispatch({ type: "SET_EDIT", payload: { status: true, id: id } });
  }

  return (
    <table className="table-auto border-2 rounded ">
      <thead>
        <tr>
          <td>Task to complete</td>
          <td>Edit</td>
          <td>Delete</td>
        </tr>
      </thead>
      <tbody>
      {data?.length>0 && Array.isArray(data)&&data?.map((val) => (
        <Todo
          key={val?._id}
          taskName={val?.description}
          onDelete={() => deleteHandler(val?._id)}
          onEdit={() => editHandler(val?._id,data)}
        />
      ))}
      </tbody>
    </table>
  );
};

export default memo(Todos);
