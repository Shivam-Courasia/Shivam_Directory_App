import React, { useState, useEffect } from 'react';
import AddPerson from './Components/AddPerson';
import RetrieveInfo from './Components/RetrieveInfo';
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [activeTab, setActiveTab] = useState('add-person');
  const [darkMode, setDarkMode] = useState(false);

  


  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'} transition-colors duration-200`}>
      <header className="py-4 px-6 flex justify-between items-center bg-white dark:bg-gray-800 shadow-md">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Shivam Directory App</h1>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
        >
          {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
        </button>
      </header>
      
      <nav className="bg-gray-200 dark:bg-gray-700 p-4">
        <div className="container mx-auto flex">
          <button
            className={`flex-1 text-center py-3 px-4 rounded-full font-semibold transition-colors duration-200 ease-in-out ${
              activeTab === 'add-person'
                ? 'bg-blue-500 text-white shadow-md'
                : `${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-700'} hover:bg-gray-400`
            }`}
            onClick={() => setActiveTab('add-person')}
          >
            Add New Person
          </button>
          <button
            className={`flex-1 text-center py-3 px-4 rounded-full font-semibold transition-colors duration-200 ease-in-out ml-4 ${
              activeTab === 'retrieve-info'
                ? 'bg-purple-500 text-white shadow-md'
                : `${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-700'} hover:bg-gray-400`
            }`}
            onClick={() => setActiveTab('retrieve-info')}
          >
            Retrieve Information
          </button>
        </div>
      </nav>
      
      <main className="flex-grow p-6">
        <div className="container mx-auto">
          {activeTab === 'add-person' ? <AddPerson darkMode={darkMode} /> : <RetrieveInfo darkMode={darkMode} />}
        </div>
      </main>
    </div>
  );
}

export default App;