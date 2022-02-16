/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import Todo from "./Todo";
import NewTodoModal from "./NewTodoModal";
import serverIp from "../serverIp";

function TodoList() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    setLoading(true);
    const resp = await axios.get(`${serverIp}/todos`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log(resp);
    todos.splice(0, todos.length);
    for (let i = 0; i < resp.data.length; i++) {
      todos.push(resp.data[i]);
    }

    setLoading(false);
  };

  const deleteTodo = async (id) => {
    const resp = await axios.delete(`${serverIp}/todos?id=` + id, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log(resp.data);
    await getTodos();
  };

  const addTodo = async (title) => {
    console.log("title: " + title);
    const resp = await axios.post(
      `${serverIp}/todos`,
      {
        title: title,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log(resp.data);
    await getTodos();
  };

  useEffect(async () => {
    await getTodos();
  }, []);

  return (
    <div>
      {loading === true ? (
        <div>
          <Todo text="Loading" loading="true" />
        </div>
      ) : (
        <div>
          <NewTodoModal addTodo={addTodo} />
          {todos.map((todo) => (
            <Todo
              text={todo.title}
              id={todo.id}
              key={todo.id}
              loading="false"
              onDelete={deleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;
