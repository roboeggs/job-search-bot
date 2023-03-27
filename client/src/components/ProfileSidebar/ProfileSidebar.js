import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ProfileSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleSettingClick = () => {
    onClose();
    navigate('/setting');
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 md:w-1/3 h-full bg-white z-10 transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-end p-2">
        <button className="focus:outline-none" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </button>
      </div>
      <div className="px-4 py-8">
        <h2 className="text-lg font-bold mb-4">Profile</h2>
        <div className="flex justify-center items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSettingClick}
          >
            Setting
          </button>
        </div>
        <div className="mt-4">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
