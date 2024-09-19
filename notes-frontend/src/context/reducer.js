export default function reducer(state, action) {
  switch (action.type) {
    case "SET_TODO":
      return { ...state, todo: action.payload };
    case "SET_EDIT":
      return { ...state, edit: action.payload };
    case "SET_TOGGLE":
      return { ...state, toggle: action.payload };
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "SET_ERR":
      return { ...state, err: action.payload };
    default:
      throw new Error("Invalid action type");
  }
}
