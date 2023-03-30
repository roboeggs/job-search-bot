import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ProfileSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      sidebarRef.current.style.transform = 'translateX(0)';
    } else {
      sidebarRef.current.style.transform = 'translateX(100%)';
    }
  }, [isOpen]);

  const handleSettingClick = () => {
    onClose();
    navigate('/setting');
  };

  return (
    <div
      ref={sidebarRef}
      className="rounded-l-2xl bg-gray-300 text-black fixed top-0 right-0 w-3/4 md:w-1/3 h-full bg-white z-10 transition-transform duration-300"
    >
      <div className="flex justify-end p-2">
        <button className="focus:outline-none" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </button>
      </div>
      <div className="px-4 py-8">
        <h2 className="text-black text-lg font-bold mb-4">Profile</h2>
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSettingClick}
          >
            Setting
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
