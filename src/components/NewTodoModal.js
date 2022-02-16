import { useState } from "react";

function NewTodoModal(props) {
  const [title, setTitle] = useState("");

  return (
    <div className="card">
      <h2>Add New To-Do</h2>
      <div className="actions">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="btn"
          onClick={() => {
            props.addTodo(title);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default NewTodoModal;
