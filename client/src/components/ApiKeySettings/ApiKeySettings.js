import React, { useState } from 'react';

const ApiKeySettings = ({ onClose, onSaveApiKey }) => {
  const [apiKey, setApiKey] = useState('');

  const handleApiKeyChange = (event) => {
    const { value } = event.target;
    setApiKey(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSaveApiKey(apiKey);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Change API Key</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="api-key">
              API Key
            </label>
            <input
              className="border rounded-lg px-3 py-2 w-full"
              id="api-key"
              name="api-key"
              type="text"
              value={apiKey}
              onChange={handleApiKeyChange}
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

export default ApiKeySettings;
