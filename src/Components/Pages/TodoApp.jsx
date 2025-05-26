import React from 'react'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTodos } from "@/Feature/TodoSlice";
import {  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  doc,
  db
} from "@/firebaseconfig"

export const TodoApp = () => {
     const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
    const todoList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setTodos(todoList));
  });

  return () => unsubscribe();
}, []);

  const addTodo = async () => {
  if (input.trim() === "") return;
  await addDoc(collection(db, "todos"), { text: input });
  setInput("");
};

const deleteTodo = async (id) => {
  await deleteDoc(doc(db, "todos", id));
};


  const updateTodo = async (id) => {
  if (editText.trim() === "") return;
  await updateDoc(doc(db, "todos", id), { text: editText });
  setEditId(null);
};


  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-2xl bg-gray-200 rounded-xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">📝 Todo App</h1>
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task..."
            className="flex-grow px-4 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-blue-700/50"
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow"
          >
            Add
          </button>
        </div>
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm"
            >
              {editId === todo.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-grow px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={() => updateTodo(todo.id)}
                    className="ml-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="text-lg text-gray-800 flex-grow">{todo.text}</span>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => {
                        setEditId(todo.id);
                        setEditText(todo.text);
                      }}
                      className="bg-yellow-700 text-white px-3 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="bg-red-700 hover:bg-red-600 text-white px-3 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
