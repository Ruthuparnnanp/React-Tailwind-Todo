import { useRef, useState } from "react";
import "./App.css";
import "tailwindcss/tailwind.css";
import Swal from "sweetalert2";
function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const myRef = useRef();

  const handlechange = (e) => {
    setTask(e.target.value);
  };

  const swalLoading = () => {
    return {
      timer: 300,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    };
  };

  const handleClick = () => {
    if (task.trim() !== "") {
      if (editIndex !== null) {
        let newList = [...todos];
        newList[editIndex] = task;
        Swal.fire(swalLoading()).then(() => setTodos(newList));
        setEditIndex(null);
      } else {
        let newArray = [...todos, task];
        Swal.fire(swalLoading()).then(() => setTodos(newArray));
      }
      setTask("");
    }
  };

  const handledelete = (id) => {
    const afterDelete = todos.filter((item, index) => index !== id);
    setTodos(afterDelete);
  };

  const handleEdit = (todo, index) => {
    myRef.current.focus();
    setEditIndex(index);
    setTask(todo);
  };

  return (
    <div className="p-3">
      <div className="container  max-w-lg mx-auto mt-10 p-5 border border-gray-300 bg-gray-100 rounded shadow">
        <h1 className="text-3xl mb-4 text-center font-sans font-bold">
          Get things{" "}
          <span style={{ fontFamily: "Orbitron" }} className="text-emerald-400">
            DONE
          </span>
        </h1>
        <div className="input flex mb-6">
          <input
            ref={myRef}
            className="flex-1 p-2 mr-2 border border-gray-400 rounded"
            type="text"
            onChange={handlechange}
            value={task}
            placeholder="Enter a task"
          />
          <button
            className="px-4 py-2 bg-blue-500 hover:scale-105 text-white rounded hover:bg-blue-600"
            onClick={handleClick}
          >
            Add
          </button>
        </div>
        {todos?.map((todo, index) => (
          <div
            key={index}
            className="flex  gap-2 mb-3 border border-gray-400 p-3 rounded justify-between items-center"
          >
            <div className="font-bold" key={index}>
              {todo}
            </div>
            <div className="btn">
              <button
                className="border border-red-500 hover:scale-95 px-4 py-2 me-2 rounded"
                onClick={() => handleEdit(todo, index)}
              >
                <i className="fa-solid fa-pen text-red-600"></i>
              </button>
              <button
                className="border border-red-500 hover:scale-95 px-4 py-2 rounded"
                onClick={() => handledelete(index)}
              >
                <i className="fa-solid fa-trash text-red-600"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;