import React, { useState } from 'react';

const ReportForm = () => {
  const [name, setName] = useState('');
  const [selectedOption, setSelectedOption] = useState('Select an option');
  const [otherText, setOtherText] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value !== 'Other') {
      setOtherText('');
    }
  };

  const handleOtherTextChange = (event) => {
    setOtherText(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center bg-[#FFFBE6] gap-5 py-20 font-sans'>
      <p className='font-bold text-5xl text-[#626F47]'>Report an Accident</p>
      <div className='border border-black shadow-lg rounded-3xl bg-[#F2EED7] w-1/2 h-fit flex flex-col px-16 py-12 gap-5'>
        <div className='input flex flex-col w-full h-fit gap-2'>
          <p className='text-sm'>Name</p>
          <input
            type="text"
            className='border border-gray-200 rounded-md shadow-sm h-10 px-4 text-sm'
            placeholder='Input Reporter Name'
            value={name}
            onChange={handleNameChange}
          />
          <p className='text-xs text-slate-600'>
            The reporter's name must be the real name as per the resident identity card.
          </p>
        </div>
        <div className='input flex flex-col w-full h-fit gap-2'>
          <p className='text-sm'>Whats Happening?</p>
          <select
            className={`border border-gray-200 rounded-md shadow-sm h-10 px-4 text-sm ${selectedOption == 'Select an option' && 'text-slate-500'} `}
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="" className=''>Select an option</option>
            <option value="Fire">Fire</option>
            <option value="Flood">Flood</option>
            <option value="Earthquake">Earthquake</option>
            <option value="Other">Other</option>
          </select>
          {selectedOption === 'Other' && (
            <input
              type="text"
              className='border border-gray-200 rounded-md shadow-sm h-10 px-4 text-sm mt-2'
              placeholder='Please specify'
              value={otherText}
              onChange={handleOtherTextChange}
            />
          )}
          <p className='text-xs text-slate-600'>
            Report the type of disaster you see! Select the Other option if the disaster is not in the list of choices.
          </p>
        </div>
        <div className='input flex flex-col w-full h-fit gap-2'>
          <p className='text-sm'>Accident Description</p>
          <textarea
            className='border border-gray-200 rounded-md shadow-sm h-32 px-4 py-2 text-sm'
            placeholder='I saw this incident when . . .'
            value={description}
            onChange={handleDescriptionChange}
          />
          <p className='text-xs text-slate-600'>
            Describe the disaster that occurred briefly! Include the important information needed!
          </p>
        </div>
      </div>
      <div className='flex justify-end w-1/2'>
        <button
          className='bg-blue-500 text-white text-lg font-bold px-8 py-1 rounded-lg shadow-lg border border-gray-600 hover:bg-blue-600 transition duration-300'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReportForm;
