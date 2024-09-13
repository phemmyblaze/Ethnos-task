import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiSearch } from "react-icons/ci";
import UserModal from '../component/UserModal';

const User = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null);

  const apiUrl = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setUsers(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const sortedUsers = [...users]
    .filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const handleView = (user) => {
    setSelectedUser(user);
    setIsOpen(!isOpen)
  };

  return (
    <div className='px-5 py-2'>
      <div className="relative hidden md:flex items-center w-[400px] h-[40px] py-2 px-4 rounded-[4px]">
        <CiSearch size={20} className="absolute left-5 text-indigo-500" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          className="pl-8 w-full h-full border-2 outline-none py-5 text-[14px] rounded-lg bg-indigo-100/30 text-indigo-500 focus:outline-0 focus:ring-2 focus:ring-indigo-600"
        />
      </div>
      <div className='overflow-x-auto table-fancy-scrollbar w-full mt-6'>
        <table className='w-full relative px-5 border-2 rounded-2xl'>
          <thead className='bg-[#f5f5f5] border-b'>
            <tr className='text-indigo-600'>
              <th
                onClick={() => handleSort('name')}
                className="px-5 py-3 text-left font-lato text-[12px] font-[700] cursor-pointer whitespace-nowrap"
              >
                Name {sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="px-5 py-3 text-left font-lato text-[12px] font-[700] cursor-pointer whitespace-nowrap"
                onClick={() => handleSort('email')}
              >
                Email {sortField === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-5 py-3 text-left font-lato text-[12px] font-[700] cursor-pointer whitespace-nowrap">
                Address
              </th>
              <th className="px-5 py-3 text-left font-lato text-[12px] font-[700] cursor-pointer whitespace-nowrap">
                Company
              </th>
              <th className="px-5 py-3 text-left font-lato text-[12px] font-[700] cursor-pointer whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id} className='text-gray-600'>
                <td className="px-5 py-3 font-[700] text-left text-[12px] md:text-[14px] whitespace-nowrap border-b">{user.name}</td>
                <td className="px-5 py-3 font-[700] text-left text-[12px] md:text-[14px] whitespace-nowrap border-b">{user.email}</td>
                <td className="px-5 py-3 font-[700] text-left text-[12px] md:text-[14px] whitespace-nowrap border-b">{user.address.city}</td>
                <td className="px-5 py-3 font-[700] text-left text-[12px] md:text-[14px] whitespace-nowrap border-b">{user.company.name}</td>
                <td className="px-5 py-3 font-[700] text-left text-[12px] md:text-[14px] whitespace-nowrap border-b cursor-pointer" onClick={() => handleView(user)}>View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1 px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="mx-1 px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {isOpen && <UserModal setIsOpen={setIsOpen} selectedUser={selectedUser}/>}
    </div>
  );
};

export default User;
