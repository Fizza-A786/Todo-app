import { useState } from 'react';
import { Sun, Moon } from "lucide-react";

import girlImg from "./assets/p1.png";
const App = () => {

  const [todolist, setTodolist] = useState([])
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const saveToDoList = (event) => {
    const toname = event.target.toname.value;
    // alert(toname)
    event.preventDefault();

    if (!todolist.includes(toname)) {
      const finalDolist = [...todolist, toname]
      setTodolist(finalDolist)
    } else {
      alert("Task already exist")
    };
    event.target.toname.value = "";
  };

  const list = todolist.map((value, index) => {
    return (
      <ToDoList 
        key={index} 
        value={value} 
        todolist={todolist} 
        indexNumber={index} 
        setTodolist={setTodolist} 
      />
    )
  })

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
      isDark 
      ? "bg-[#14001f] text-white" 
      : "bg-gradient-to-br from-pink-200 via-pink-100 to-purple-200 text-gray-800"
    }`}>

      <div className="absolute w-48 sm:w-72 h-48 sm:h-72 bg-pink-400 opacity-30 rounded-full blur-3xl animate-pulse top-[-40px] left-[-40px]"></div>
      <div className="absolute w-48 sm:w-72 h-48 sm:h-72 bg-purple-400 opacity-30 rounded-full blur-3xl animate-pulse bottom-[-40px] right-[-40px]"></div>

  
        <div className="absolute w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full top-20 left-6 sm:left-10 animate-ping"></div>
      <div className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-pink-400 rounded-full top-36 sm:top-40 right-6 sm:right-10 animate-pulse"></div>

      <div className="relative z-10 px-4 pt-6 sm:pt-10 max-w-md mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">
             My Tasks
          </h1>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/30 backdrop-blur-md hover:scale-110 transition"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <p className="text-xs sm:text-sm opacity-70 mt-1">
          Add, Complete and delete your Task.
        </p>

        <div className="flex justify-center mt-4 sm:mt-6">
          <img
            src={girlImg}
            alt="girl"
            className="w-30 sm:w-56 md:w-60 animate-float drop-shadow-2xl"
          />
        </div>

        {/* INPUT */}
        <form onSubmit={saveToDoList} className="flex gap-2 mt-5 sm:mt-6">
          <input
            type="text"
            name='toname'
            placeholder="Add something cute..."
            className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-5 text-sm sm:text-base rounded-full outline-none backdrop-blur-md shadow-lg transition ${
              isDark
                ? "bg-white/10 placeholder-gray-300"
                : "bg-white/70"
            }`}
          />

          <button className="px-4 sm:px-6 text-sm sm:text-base rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white shadow-lg hover:scale-110 active:scale-95 transition">
            +
          </button>
        </form>

        {/* LIST */}
        <ul className="mt-5 sm:mt-6 space-y-2 sm:space-y-3">
          {list}
        </ul>

      </div>
    </div>
  );
};

export default App;

function ToDoList({ value, indexNumber, setTodolist, todolist }) {
  const [status, setStatus] = useState(false);

  const checkStatus = () => {
    setStatus(!status);
  };

  const deleteRow = (e) => {
    e.stopPropagation();
    const finalData = todolist.filter((v, i) => i !== indexNumber);
    setTodolist(finalData);
  };

  return (
    <li
      onClick={checkStatus}
      className={`flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base rounded-full bg-white/60 backdrop-blur-lg shadow-md hover:scale-[1.03] transition cursor-pointer ${
        status ? "opacity-60" : ""
      }`}
    >
      {/* LEFT SIDE TEXT */}
      <div className="flex items-center gap-2">
        
        <span
          className={`transition-all duration-300 ${
            status ? "line-through text-gray-400" : ""
          }`}
        >
          {indexNumber}. {value}
        </span>

        {/*  COMPLETED BADGE */}
        {status && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500 text-white">
            Completed ✔
          </span>
        )}
      </div>

      {/* DELETE BUTTON */}
      <span
        onClick={deleteRow}
        className="ml-3 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white cursor-pointer hover:scale-110 transition"
      >
        ×
      </span>
    </li>
  );
}