
import { FaTimes } from 'react-icons/fa';
import { BsFileEarmarkPost } from "react-icons/bs";




const PostModal = ({setIsOpen, selectedPost}) => {
   
    
  

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-grey-1100 bg-opacity-50 backdrop-blur-sm font-lato'>
      <div className='bg-white w-[90vw] md:w-[500px] custom-border lg:max-h-[90vh] overflow-y-auto hide-scrollbar text-primary'>
        <div className='relative h-auto bg-white flex flex-col items-center gap-4 p-[15px] md:p-[30px] overflow-hidden '>
          
            <div className="bg-indigo-800 bg-opacity-[20%] p-[20px] rounded-full">
            <div className="bg-indigo-800 bg-opacity-[10%] p-[15px] rounded-full">
                <BsFileEarmarkPost size={24} color="#4B0082" />
            </div>
            </div>
            <div className="flex flex-col gap-3">
                <h1 className="text-xl font-bold text-center text-indigo-600">Post Details</h1>

                <div className="flex justify-between items-center gap-4">
                    <h1 className='font-bold text-xl text-gray-600'>Title:</h1>
                    <p className='text-indigo-600 capitalize'>{selectedPost.title}</p>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                    <h1 className='font-bold text-xl text-gray-600'>Body:</h1>
                    <p className='text-indigo-600'>{selectedPost.body}</p>
                </div>
                <div className="flex justify-between items-center gap-4">
                    <h1 className='font-bold text-xl text-gray-600'>User:</h1>
                    <p className='text-indigo-600 capitalize'>{selectedPost.userName}</p>
                </div>

                
               
                
                
            </div>

              

            <div onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-indigo-600 hide-scrollbar flex justify-end cursor-pointer">
                <FaTimes size={24} />
            </div>

        
        </div>
      </div>
    </div>
  );
};

export default PostModal;
