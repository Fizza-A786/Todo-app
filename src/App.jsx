import { useState, useEffect } from 'react';
import { Sun, Moon } from "lucide-react";
import girlImg from "./assets/p1.png";

const App = () => {

  // ✅ Lazy initialization (FIXED warning)
  const [todolist, setTodolist] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  const [isDark, setIsDark] = useState(() => {
    return JSON.parse(localStorage.getItem("theme")) || false;
  });

  const [editIndex, setEditIndex] = useState(null);

  // 💾 Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(todolist));
  }, [todolist]);

  // 💾 Save theme
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // ➕ ADD + ✏️ EDIT TASK
  const saveToDoList = (event) => {
    event.preventDefault();
    const toname = event.target.toname.value;

    if (!toname.trim()) return;

    if (editIndex !== null) {
      const updated = [...todolist];
      updated[editIndex] = toname;
      setTodolist(updated);
      setEditIndex(null);
    } else {
      if (!todolist.includes(toname)) {
        setTodolist([...todolist, toname]);
      } else {
        alert("Task already exists");
      }
    }

    event.target.toname.value = "";
  };

  // ✏️ EDIT TASK
  const editTask = (index) => {
    document.querySelector("input[name='toname']").value = todolist[index];
    setEditIndex(index);
  };

  const list = todolist.map((value, index) => (
    <ToDoList
      key={index}
      value={value}
      indexNumber={index}
      todolist={todolist}
      setTodolist={setTodolist}
      editTask={editTask}
    />
  ));

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
      isDark
        ? "bg-[#14001f] text-white"
        : "bg-gradient-to-br from-pink-200 via-pink-100 to-purple-200 text-gray-800"
    }`}>

      {/* background glow */}
      <div className="absolute w-48 h-48 bg-pink-400 opacity-30 rounded-full blur-3xl top-[-40px] left-[-40px]"></div>
      <div className="absolute w-48 h-48 bg-purple-400 opacity-30 rounded-full blur-3xl bottom-[-40px] right-[-40px]"></div>

      <div className="relative z-10 max-w-md mx-auto px-4 pt-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Tasks</h1>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/30 backdrop-blur-md hover:scale-110 transition"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <p className="text-sm opacity-70 mt-1">
          Add, edit and manage your tasks
        </p>

        {/* IMAGE */}
        <div className="flex justify-center mt-5">
          <img src={girlImg} alt="girl" className="w-52 animate-float" />
        </div>

        {/* INPUT */}
        <form onSubmit={saveToDoList} className="flex gap-2 mt-5">
          <input
            type="text"
            name="toname"
            placeholder="Add your task..."
            className={`flex-1 py-3 px-5 rounded-full outline-none shadow-md ${
              isDark ? "bg-white/10 placeholder-gray-300" : "bg-white/70"
            }`}
          />

          <button className="px-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-110 transition">
            {editIndex !== null ? "Update" : "+"}
          </button>
        </form>

        {/* LIST */}
        <ul className="mt-6 space-y-3">
          {list}
        </ul>

      </div>
    </div>
  );
};

export default App;

// ================= TASK ITEM =================
function ToDoList({ value, indexNumber, setTodolist, todolist, editTask }) {

  const [status, setStatus] = useState(false);

  const toggleStatus = () => {
    setStatus(!status);
  };

  const deleteTask = (e) => {
    e.stopPropagation();
    const updated = todolist.filter((_, i) => i !== indexNumber);
    setTodolist(updated);
  };

  return (
    <li
      onClick={toggleStatus}
      className={`flex justify-between items-center px-5 py-3 rounded-full bg-white/60 backdrop-blur-md shadow-md cursor-pointer transition ${
        status ? "opacity-60" : ""
      }`}
    >
      {/* TEXT */}
      <span className={status ? "line-through text-gray-400" : ""}>
        {indexNumber + 1}. {value}
      </span>

      {/* ACTIONS */}
      <div className="flex gap-2">

        {/* EDIT */}
        <span
          onClick={(e) => {
            e.stopPropagation();
            editTask(indexNumber);
          }}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-500 text-white hover:scale-110 transition"
        >
          ✎
        </span>

        {/* DELETE */}
        <span
          onClick={deleteTask}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-110 transition"
        >
          ×
        </span>

      </div>
    </li>
  );
}