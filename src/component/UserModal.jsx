
import { FaTimes } from 'react-icons/fa';
import { FaUser } from "react-icons/fa";



const UserModal = ({setIsOpen, selectedUser}) => {

    console.log(selectedUser)
    
  

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-grey-1100 bg-opacity-50 backdrop-blur-sm font-lato'>
      <div className='bg-white w-[90vw] md:w-[500px] custom-border lg:max-h-[90vh] overflow-y-auto hide-scrollbar text-primary'>
        <div className='relative h-auto bg-white flex flex-col items-center gap-4 p-[15px] md:p-[30px] overflow-hidden '>
          
            <div className="bg-indigo-800 bg-opacity-[20%] p-[20px] rounded-full">
            <div className="bg-indigo-800 bg-opacity-[10%] p-[15px] rounded-full">
                <FaUser size={24} color="#4B0082" />
            </div>
            </div>
            <div className="flex flex-col gap-3">
                <h1 className="text-xl font-bold text-center">User details</h1>

                <div className='flex justify-between items-center gap-10'>
                    <h1 className='font-bold text-xl text-gray-600'>Full name:</h1>
                    <p className='text-indigo-600'>{selectedUser.name}</p>
                </div>
                <div className='flex justify-between items-center gap-10'>
                    <h1 className='font-bold text-xl text-gray-600'>UserName:</h1>
                    <p className='text-indigo-600'>{selectedUser.username}</p>
                </div>
                <div className='flex justify-between items-center gap-10'>
                    <h1 className='font-bold text-xl text-gray-600'>Email:</h1>
                    <p className='text-indigo-600'>{selectedUser.email}</p>
                </div>
                <div className='flex justify-between items-center gap-10'>
                    <h1 className='font-bold text-xl text-gray-600'>Address:</h1>
                    <p className='text-indigo-600'>{[
                  selectedUser.address.suite,
                  selectedUser.address.city
                ].join(', ')}</p>
                    
                </div>
                <div className='flex justify-between items-center gap-10'>
                    <h1 className='font-bold text-xl text-gray-600'>Phone Number:</h1>
                    <p className='text-indigo-600'>{selectedUser.phone}</p>
                </div>
                <div className='flex justify-between items-center gap-10'>
                    <h1 className='font-bold text-xl text-gray-600'>Website:</h1>
                    <p className='text-indigo-600'>{selectedUser.website}</p>
                </div>
                <div className='flex justify-between items-center gap-10'>
                    <h1 className='font-bold text-xl text-gray-600'>Company:</h1>
                    <p className='text-indigo-600'>{selectedUser.company.name}</p>
                </div>

                <h1 className='text-center text-indigo-600'>Send a message to connect</h1>
            </div>

              

            <div onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-primary hide-scrollbar flex justify-end cursor-pointer">
                <FaTimes size={24} />
            </div>

        
        </div>
      </div>
    </div>
  );
};

export default UserModal;
