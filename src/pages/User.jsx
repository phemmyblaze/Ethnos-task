import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiSearch } from "react-icons/ci";
import UserModal from '../component/UserModal';
import { Circles } from "react-loader-spinner";
const User = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const apiUrl = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    setLoading(true);
    axios.get(apiUrl)
      .then(response => {
        setUsers(response.data);
        setLoading(false);
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
    <div className='px-5 py-2 h-screen'>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Circles height="200" width="100" color="#4f46e5" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" />
        </div>

      ) : (
        <>
        <div className='flex justify-end'>
        <div className="relative md:flex md:justify-end items-center w-[400px] h-[40px] rounded-[4px] sm:block sm:justify-center">
          {/* <CiSearch size={20} className="absolute left-5 text-indigo-500 sm:hidden lg:block" /> */}
          <input
            type="text"
            placeholder="Search by name, email"
            value={search}
            onChange={handleSearch}
            className="pl-3 w-full h-full border-2 outline-none py-5 text-[14px] rounded-lg bg-indigo-100/30 text-indigo-500 focus:outline-0 focus:ring-2 focus:ring-indigo-600"
          />
        </div>
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
              <tr key={user.id} className='dark:text-white'>
                <td className="px-5 py-3 font-[700] text-left text-[12px] md:text-[14px] whitespace-nowrap border-b">{user.name}</td>
                <td className="px-5 py-3 font-[700] text-left text-[12px] md:text-[14px] whitespace-nowrap border-b">{user.email}</td>
                <td className="px-5 py-3 font-[700] text-left text-[12px] md:text-[14px] whitespace-nowrap border-b">{`${user.address.suite}, ${user.address.street} (${user.address.city})`}</td>
                <td className="px-5 py-3 font-[700] text-left text-[12px] md:text-[14px] whitespace-nowrap border-b">{user.company.name}</td>
                <td className="px-5 py-3 font-[700] text-left text-[12px] md:text-[14px] whitespace-nowrap border-b cursor-pointer text-green-600" onClick={() => handleView(user)}>View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex sm:hidden md:flex md:justify-end mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1 px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-indigo-500 text-white' : ''}`}
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
        </>
      )}
      
      {isOpen && <UserModal setIsOpen={setIsOpen} selectedUser={selectedUser}/>}
    </div>
  );
};

export default User;
