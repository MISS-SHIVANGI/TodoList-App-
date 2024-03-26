import { useEffect, useState } from 'react'
import  {TodoProvider }from './Context/TodoContext'
import './App.css'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem'

function App() {
  const [todos, setTodos] = useState([]) 
  
  const addTodo = (todo) =>{ 
     setTodos((prev)=>[{id:Date.now(), ...todo}, ...prev])
  }
  const deleteTodo = (id) =>{ 
      setTodos((prev)=>prev.filter((todo)=>
       todo.id!==id
      ))
  }
  const updateTodo = (id, todo) =>{ 
    setTodos((prev)=> prev.map((prevTodo)=>(prevTodo.id===id ? todo:prevTodo)))
         
  }
  const toggleComplete = (id) =>{ 
    setTodos((prev)=> prev.map((prevTodo)=> prevTodo.id ===id? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }  

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length)
    {
      setTodos(todos)
    }
           
  }, []) 

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  
  
  return (
   <TodoProvider value={{todos, addTodo, deleteTodo, updateTodo, toggleComplete}}>
   <h2 className='text-4xl bg-gray-500 p-4 m-1 font-serif '> Todo List With Context-API</h2>
   <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-2 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here   */}
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo)=> (
                          <div key={todo.id}
                          className='w-full'>
                                 <TodoItem  todo={todo}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

   </ TodoProvider> 
 
  )
}

export default App
