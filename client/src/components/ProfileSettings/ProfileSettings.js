import React, { useState } from 'react';

const ProfileSettings = ({ onClose }) => {
  // Создаем стейт для хранения данных о пользователе
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Обработчик изменения полей формы
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Обновляем стейт с помощью функции setUserData
    // Сначала копируем предыдущий стейт, а затем обновляем поле, которое изменилось
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  // Обработчик отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: отправить данные на сервер

    // Закрываем модальное окно
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Profile Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="border rounded-lg px-3 py-2 w-full"
              id="name"
              name="name"
              type="text"
              value={userData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border rounded-lg px-3 py-2 w-full"
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="border rounded-lg px-3 py-2 w-full"
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2"
              type="submit"
            >
              Save
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
