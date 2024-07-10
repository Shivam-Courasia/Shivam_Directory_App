import React, { useState } from 'react';

function RetrieveInfo({ darkMode }) {
  const [aadhar, setAadhar] = useState('');
  const [person, setPerson] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const people = JSON.parse(localStorage.getItem('people') || '[]');
    const foundPerson = people.find(p => p.aadhar === aadhar);
    setPerson(foundPerson || null);
  };

  return (
    <div className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <h2 className="text-3xl font-semibold mb-6">Retrieve Information</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex items-center">
            <label htmlFor="search-aadhar" className="mr-4 text-lg">Aadhar Number:</label>
            <input
              type="text"
              id="search-aadhar"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              required
              className={`flex-grow border p-3 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
            />
            <button type="submit" className="bg-purple-500 text-white px-8 py-3 rounded-r text-lg hover:bg-purple-600 transition-colors duration-150 shadow-md">Search</button>
          </div>
        </form>
        {person ? (
          <div className={`shadow-md rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <table className="w-full border-collapse">
              <thead>
                <tr className={darkMode ? 'bg-gray-600' : 'bg-purple-100'}>
                  <th className={`border-b p-4 text-left ${darkMode ? 'border-gray-500 text-gray-200' : 'border-purple-200 text-purple-800'}`}>Name</th>
                  <th className={`border-b p-4 text-left ${darkMode ? 'border-gray-500 text-gray-200' : 'border-purple-200 text-purple-800'}`}>Date of Birth</th>
                  <th className={`border-b p-4 text-left ${darkMode ? 'border-gray-500 text-gray-200' : 'border-purple-200 text-purple-800'}`}>Aadhar Number</th>
                  <th className={`border-b p-4 text-left ${darkMode ? 'border-gray-500 text-gray-200' : 'border-purple-200 text-purple-800'}`}>Mobile Number</th>
                  <th className={`border-b p-4 text-left ${darkMode ? 'border-gray-500 text-gray-200' : 'border-purple-200 text-purple-800'}`}>Age</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50'} transition-colors duration-150`}>
                  <td className={`border-b p-4 ${darkMode ? 'border-gray-500' : 'border-gray-200'}`}>{person.name}</td>
                  <td className={`border-b p-4 ${darkMode ? 'border-gray-500' : 'border-gray-200'}`}>{person.dob}</td>
                  <td className={`border-b p-4 ${darkMode ? 'border-gray-500' : 'border-gray-200'}`}>{person.aadhar}</td>
                  <td className={`border-b p-4 ${darkMode ? 'border-gray-500' : 'border-gray-200'}`}>{person.mobile}</td>
                  <td className={`border-b p-4 ${darkMode ? 'border-gray-500' : 'border-gray-200'}`}>{person.age}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-xl mt-8">No match found</p>
        )}
      </div>
    </div>
  );
}

export default RetrieveInfo;