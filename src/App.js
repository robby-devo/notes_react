import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  // editid will contain the variable of the ID that we need to edit
  const handleSubmit = (e) => {
    e.preventDefault();

    // check if there is something inside edit id

    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }
    if (todo !== "") {
      setTodos([...todos, { id: `${todo}-${Date.now()}`, todo }]);
      // whatever it has as an array it will take and value of input box
      setTodo("");
      // console.log(todos);
    }
  };
  const handleDelete = (id) => {
    const deleteTodo = todos.filter((val) => {
      return val.id !== id;
    });
    setTodos([...deleteTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    // console.log(editTodo);
    // Object { id: "fr-1650953889040", todo: "hello" }
    // App.js:27

    setTodo(editTodo.todo);
    // showing this to input box
    setEditId(id);
    // for go and edit button
  };
  // setTodo("");
  return (
    <div className="App">
      <div className="container">
        <h1>Todo List Application</h1>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <button type="submit">{editId ? "Edit" : "Go"}</button>
        </form>

        {/* list to render all todos */}
        <ul className="allTodos">
          {todos.map((val) => {
            return (
              <li className="singleTodo">
                <span className="todoText" key={val.id}>
                  {val.todo}
                </span>
                <button
                  onClick={() => {
                    handleEdit(val.id);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDelete(val.id);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
