import { useEffect, useState } from "react";

function Todo() {
  // This is used to store the task list as a variable store value
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  // set in local storage so it will not dissaperar after refresh in page and UseEffect works like onMount it will work on every time when page will render
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to controll Add Todo
  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const newTask = { text: trimmed, completed: false };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  // Function to handel the delete todo
  const handleDelete = (indexToDelete) => {
    const filtered = tasks.filter((_, i) => i !== indexToDelete);
    setTasks(filtered);
  };

  // This function allowed to check the todo that completed the task or not
  const handelChecked = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

   // Function to create handel the Save Button
  const handelSaveButton = (index) => {
    const trimmedText = editedText.trim();
    if (trimmedText === "") return;
    const updated = [...tasks];
    updated[index].text = trimmedText;
    setTasks(updated);
    setEditIndex(null);
    setEditedText("");
  };
  
  // If want to clear all the todo then use this function
  const handleClearAll = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
  };

  return (
    <div>
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6">

        {/* Icon and Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-blue-600 text-[30px]">
            edit_note
          </span>
          My Todo List
        </h1>

        {/* Input and Add button */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div>
          {tasks.map((task, index) => (

            <div
              key={index}
              className="border rounded-lg p-3 mb-2 bg-gray-50 shadow-sm"
            >

              <div className="flex justify-between items-start gap-4">
                {/* Left: checkbox + text or input */}
                <div className="flex items-center gap-2 flex-1">

                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handelChecked(index)}
                  />
                  {editIndex === index ? (

                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                    />
                  ) : (
                    
                    // Task List When We update for Edit
                    <span
                      className={`text-sm ${
                        task.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.text}
                    </span>
                  )}
                </div>

                {/* Right: Buttons */}
                <div className="flex gap-2  p-2 flex-wrap text-sm">
                  {editIndex === index ? (
                    <>

                    {/* Save Button */}
                      <button
                        className="text-green-600 hover:underline"
                        onClick={() => handelSaveButton(index)}
                      >
                        Save
                      </button>

                      {/* Cancel Button */}
                      <button
                        className="text-gray-600 hover:underline"
                        onClick={() => {
                          setEditIndex(null);
                          setEditedText("");
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (

                    // Edit Button
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => {
                        setEditIndex(index);
                        setEditedText(task.text);
                      }}
                    >
                      Edit
                    </button>
                  )}

                  {/* Delete Button */}
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clear All Button */}
        {tasks.length > 0 && (
          <button
            onClick={handleClearAll}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Clear All Tasks
          </button>
        )}
      </div>
    </div>
  );
}

export default Todo;
