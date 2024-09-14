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

  const handleFilterChange = (status) => {
    setFilterStatus(status);
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
    <div className='px-5 py-2'>
      <div className="flex justify-center mb-4">
        <button className={`mr-2 font-medium text-lg ${filterStatus === 'all' ? 'text-indigo-600' : 'text-gray-600'}`} onClick={() => handleFilterChange('all')}>All</button>
        <button className={`mr-2 font-medium text-lg ${filterStatus === 'completed' ? 'text-indigo-600' : 'text-gray-600'}`} onClick={() => handleFilterChange('completed')}>Completed</button>
        <button className={` font-medium text-lg ${filterStatus === 'not-completed' ? 'text-indigo-600' : 'text-gray-600'}`} onClick={() => handleFilterChange('not-completed')}>Not Completed</button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Circles height="200" width="100" color="#4f46e5" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" />
        </div>
      ) : (
        <>
          <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            {currentTodos.map(todo => (
              <div key={todo.id} className='border-2 border-gray-200 p-4 rounded-md '>
                <div className=''>Status: {todo.completed ? 'Completed' : 'Not Completed'}</div>
                <h2 className='text-[14px] text-gray-800'>{todo.title}</h2>
              </div>
            ))}
          </div>
          <div className="mt-5 sm:hidden md:flex md:justify-center md:gap-3">
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
                className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
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
