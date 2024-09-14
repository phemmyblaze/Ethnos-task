import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Circles } from "react-loader-spinner";

const Albums = () => {
  const [album, setAlbum] = useState([])
  const [users, setUsers] = useState([])
  const [combinedData, setCombinedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAlbum, setTotalAlbum] = useState(0);
  const albumPerPage = 12;
  const [loading, setLoading] = useState(true);
  

  const ablumApiUrl = "https://jsonplaceholder.typicode.com/albums";
  const usersApiUrl = "https://jsonplaceholder.typicode.com/users";

 useEffect(() => {
  const fetchData =  async () => {
    setLoading(true);
    try {
      const [ablumResponse, usersResponse] = await Promise.all([
        axios.get(ablumApiUrl),
        axios.get(usersApiUrl)
      ]);

      setTotalAlbum(ablumResponse.data.length);

      const paginatedAlbums = ablumResponse.data.slice(
        (currentPage-1) * albumPerPage,
        currentPage * albumPerPage
      );

      setAlbum(paginatedAlbums)
      setUsers(usersResponse.data)

      const dataWithUserInfo =  paginatedAlbums.map((album) => {
        const user =  usersResponse.data.find(user => user.id === album.userId)
        return {
          ...album,
          userName: user ? user.name : "unknown user"
        }
      })

      setCombinedData(dataWithUserInfo)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false); 
    }

  }

  fetchData();
 }, [currentPage])

 const totalPages = Math.ceil(totalAlbum/ albumPerPage)

 const handlePageChange = (newPage) => {
  if (newPage < 1 || newPage > totalPages) return;
  setCurrentPage(newPage);
};

  return (
    <div className='px-5 py-2'>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Circles height="200" width="100" color="#4B0082" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" />
        </div>
      ) : (
        <>
        <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {combinedData.map((album) => (
          <div key={album.id} className='flex flex-col border-2 px-3 py-5 text-justify h-full'>
            <div className='flex flex-col flex-grow'>
              <div className='mb-5'>
                <p className='text-indigo-500'>Title</p>
                <h1 className='text-lg font-medium text-gray-600'>{album.title}</h1>
              </div>
              
              <p className='text-indigo-600 text-sm mt-5'>User: {album.userName}</p>
            </div>
            
          </div>
        ))}
      </div>




      <div className='mt-5 sm:hidden md:flex md:justify-center'>
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
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-indigo-500 text-white' : ''}`}
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
  )
}

export default Albums