import TodoList from "./components/TodoList";

//make it fetch it from a server and have a list with use state
//create a button that opens a dialogue with the backdrop that has input for a new todo that will be added to the list and will refetch the data afterwords automatically
function App() {
  return (
    <div>
      <h1>My Todos</h1>
      <TodoList />
    </div>
  );
}

export default App;
