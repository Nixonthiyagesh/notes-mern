import Button from "../Button";

const Todo = ({ taskName, onDelete, onEdit }) => {
  return (
    <tr>
      <td>{taskName}</td>
      <td>
        <Button onClick={onEdit}>
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        </Button>{" "}
      </td>
      <td>
        <Button onClick={onDelete}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </Button>
      </td>
    </tr>
  );
};

export default Todo;
