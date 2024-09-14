import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PostModal from '../component/PostModal';
import { Circles } from "react-loader-spinner";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 12;
  const [loading, setLoading] = useState(true);

  const postsApiUrl = "https://jsonplaceholder.typicode.com/posts";
  const usersApiUrl = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          axios.get(postsApiUrl),
          axios.get(usersApiUrl)
        ]);

        setTotalPosts(postsResponse.data.length);

        const paginatedPosts = postsResponse.data.slice(
          (currentPage - 1) * postsPerPage,
          currentPage * postsPerPage
        );

        setPosts(paginatedPosts);
        setUsers(usersResponse.data);

        const dataWithUserInfo = paginatedPosts.map(post => {
          const user = usersResponse.data.find(user => user.id === post.userId);
          return {
            ...post,
            userName: user ? user.name : 'Unknown User'
          };
        });

        setCombinedData(dataWithUserInfo);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [currentPage]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const handleView = (post) => {
    setSelectedPost(post);
    setIsOpen(true);
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
            {combinedData.map((post) => (
              <div key={post.id} className='flex flex-col border-2 px-3 py-5 text-justify h-full'>
                <div className='flex flex-col flex-grow'>
                  <div className='mb-5'>
                    <p className='text-indigo-500'>Title</p>
                    <h1 className='text-lg font-medium text-gray-600'>{post.title}</h1>
                  </div>
                  <p>{post.body}</p>
                  <p className='text-indigo-600 text-sm mt-5'>Author: {post.userName}</p>
                </div>
                <div 
                  className='text-center mt-4 bg-indigo-300 px-3 py-2 rounded-2xl cursor-pointer hover:bg-indigo-800 hover:text-white ease-in-out duration-300 hover:scale-95'
                  onClick={() => handleView(post)}
                >
                  View Details
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
      

      {isOpen && selectedPost && (
        <PostModal 
          setIsOpen={setIsOpen} 
          selectedPost={selectedPost}
        />
      )}
    </div>
  );
};

export default Posts;
