import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredTodos = todo
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => {
      if (filter === "complete") return item.completed;
      if (filter === "pending") return !item.completed;
      return true;
    });

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    console.log(currentUser);
    if (currentUser) {
      const allTodos = JSON.parse(localStorage.getItem("Todos") || "[]");
      console.log(allTodos);
      const userTodos = allTodos.find((unique) => unique.id === currentUser);
      console.log(userTodos);
      console.log(userTodos?.todos);
      setTodo(userTodos ? userTodos.todos : []);
    }
  }, []);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const allTodos = JSON.parse(localStorage.getItem("Todos") || "[]");
      const userIndex = allTodos.findIndex(
        (unique) => unique.id === currentUser,
      );
      console.log(userIndex);

      if (userIndex !== -1) {
        allTodos[userIndex].todos = todo;
      } else {
        allTodos.push({ id: currentUser, todos: todo });
      }
      localStorage.setItem("Todos", JSON.stringify(allTodos));
    }
  }, [todo]);

  const handleAdd = () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    setTodo((currentTodo) => [
      ...currentTodo,
      { text: trimmedTask, completed: false },
    ]);
    setTask("");
  };

  const handleToggleComplete = (index) => {
    setTodo((currentTodo) =>
      currentTodo.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleDelete = (index) => {
    const updateTodo = todo.filter((_, i) => i !== index);
    setTodo(updateTodo);
  };

  const handleEdit = (index) => {
    setEditTask(index);
    console.log(index);
    setTask(todo[index].text);
  };

  const handleUpdate = () => {
    const trimmedTask = task.trim();
    if (editTask === null || !trimmedTask) return;

    setTodo((currentTodo) =>
      currentTodo.map((item, index) =>
        index === editTask ? { ...item, text: trimmedTask } : item,
      ),
    );
    setEditTask(null);
    setTask("");
  };

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    return navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6 rounded-xl bg-white p-6 shadow-md sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Todo App</h1>

          <button
            onClick={handleSignOut}
            className="rounded-lg bg-red-500 cursor-pointer px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
            className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {editTask !== null ? (
            <button
              onClick={handleUpdate}
              className="rounded-lg cursor-pointer bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
            >
              Update Task
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="rounded-lg cursor-pointer bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Add Task
            </button>
          )}
        </div>

        {/* Todo List */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            My Tasks ({todo.length})
          </h2>

          <div className="mb-4 flex flex-wrap gap-2">
            {[
              { value: "all", label: "All" },
              { value: "complete", label: "Complete" },
              { value: "pending", label: "Pending" },
            ].map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  filter === value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {todo.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">
              No tasks yet. Add your first task.
            </p>
          ) : filteredTodos.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">
              No {filter} tasks.
            </p>
          ) : (
            <ul className="space-y-3">
              {filteredTodos.map(({ item: data, index }) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-4 py-3"
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={data.completed}
                    onChange={() => handleToggleComplete(index)}
                    className="cursor-pointer"
                  />

                  {/* Task text */}
                  <span
                    className={`flex-1 wrap-break-word ${
                      data.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {data.text}
                  </span>

                  {/* Buttons */}
                  <div className="flex gap-3 shrink-0">
                    <button
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium cursor-pointer"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
