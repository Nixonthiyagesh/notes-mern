import { memo } from "react";
import Todo from "../Todo";
import "./index.css";
let i=0;
const Todos = ({ data, dispatch }) => {
  console.log(i++);

  const deleteHandler = (id) => {
    fetch(`https://notes-mern-y8iv.onrender.com/notes/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token":
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVhZTRhZTIxNmM3MTYwZmM2N2M1MDEiLCJpYXQiOjE3MjY2NzAwMzB9.IAekhkm4PqQnAU0clbpYKQjyaEomCxUEY_7BPkPcBuE",
      },
    })
      .then((data) => data.json())
      .then((data) => dispatch({ type: "SET_TODOS", payload: data }))
      .catch((err) => console.log(err));
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
