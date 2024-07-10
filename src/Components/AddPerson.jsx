import React, { useState, useEffect } from 'react';

function AddPerson({ darkMode }) {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const storedPeople = JSON.parse(localStorage.getItem('people') || '[]');
    setPeople(storedPeople);
  }, []);

  const addRow = () => {
    setPeople([...people, { name: '', dob: '', aadhar: '', mobile: '', age: '' }]);
  };

  const updatePerson = (index, field, value) => {
    const newPeople = [...people];
    newPeople[index][field] = value;
    if (field === 'dob') {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      newPeople[index].age = age.toString();
    }
    setPeople(newPeople);
  };

  const savePerson = (index) => {
    const person = people[index];
    if (!person.name || !person.dob || !person.aadhar || !person.mobile) {
      alert('All fields are required');
      return;
    }
    if (person.aadhar.length !== 12) {
      alert('Aadhar Number should be 12 digits');
      return;
    }
    if (person.mobile.length !== 10) {
      alert('Mobile Number should be 10 digits');
      return;
    }
    localStorage.setItem('people', JSON.stringify(people));
    alert('Person saved successfully');
  };

  const deletePerson = (index) => {
    const newPeople = people.filter((_, i) => i !== index);
    setPeople(newPeople);
    localStorage.setItem('people', JSON.stringify(newPeople));
  };

  return (
    <div className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <h2 className="text-3xl font-semibold mb-6">Add New Person</h2>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <table className={`w-full border-collapse ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          <thead>
            <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-200'}>
              <th className={`border p-3 text-left ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Name</th>
              <th className={`border p-3 text-left ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Date of Birth</th>
              <th className={`border p-3 text-left ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Aadhar Number</th>
              <th className={`border p-3 text-left ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Mobile Number</th>
              <th className={`border p-3 text-left ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Age</th>
              <th className={`border p-3 text-left ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <tr key={index} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors duration-150`}>
                <td className={`border p-3 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  <input
                    type="text"
                    value={person.name}
                    onChange={(e) => updatePerson(index, 'name', e.target.value)}
                    className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                </td>
                <td className={`border p-3 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  <input
                    type="date"
                    value={person.dob}
                    onChange={(e) => updatePerson(index, 'dob', e.target.value)}
                    className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                </td>
                <td className={`border p-3 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  <input
                    type="text"
                    value={person.aadhar}
                    onChange={(e) => updatePerson(index, 'aadhar', e.target.value)}
                    className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                </td>
                <td className={`border p-3 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  <input
                    type="text"
                    value={person.mobile}
                    onChange={(e) => updatePerson(index, 'mobile', e.target.value)}
                    className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                </td>
                <td className={`border p-3 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>{person.age}</td>
                <td className={`border p-3 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  <button
                    onClick={() => savePerson(index)}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition-colors duration-150"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => deletePerson(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-150"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={addRow}
        className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-150 shadow-md text-lg"
      >
        Add New Row
      </button>
    </div>
  );
}

export default AddPerson;