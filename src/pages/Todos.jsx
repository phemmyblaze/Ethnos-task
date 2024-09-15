import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Circles } from "react-loader-spinner";

const Todos = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); 
  const [filterStatus, setFilterStatus] = useState('all');

  const apiUrl = "https://jsonplaceholder.typicode.com/todos";

  useEffect(() => {
    setLoading(true);
    axios.get(apiUrl)
      .then(response => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1); 
  };

  const filteredTodos = todos.filter(todo => {
    if (filterStatus === 'completed') {
      return todo.completed;
    } else if (filterStatus === 'not-completed') {
      return !todo.completed;
    }
    return true;
  });

  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='px-5 py-2 h-screen'>
      <div className="flex justify-end mb-4">
        <select 
          value={filterStatus} 
          onChange={handleFilterChange} 
          className='font-medium text-lg border-2 py-2 px-5 border-indigo-300 rounded-md focus:border-indigo-300 outline-none text-indigo-600'
        >
          <option value="all" className='text-indigo-600'>All</option>
          <option value="completed" className='text-indigo-600'>Completed</option>
          <option value="not-completed" className='text-indigo-600'>Not Completed</option>
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Circles height="200" width="100" color="#4f46e5" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} />
        </div>
      ) : (
        <>
          <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            {currentTodos.map(todo => (
              <div 
                key={todo.id} 
                className={`border-2 p-4 rounded-md`}
              >
                <div className={`font-medium ${todo.completed ? 'text-green-600' : 'text-red-600'}`}>
                  Status: {todo.completed ? 'Completed' : 'Not Completed'}
                </div>
                <h2 className='text-[14px]'>{todo.title}</h2>
              </div>
            ))}
          </div>
          <div className="mt-5 sm:hidden md:flex md:justify-end md:gap-3">
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              className='mx-1 px-3 py-1 border rounded disabled:opacity-50'
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className='mx-1 px-3 py-1 border rounded disabled:opacity-50'
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Todos;
