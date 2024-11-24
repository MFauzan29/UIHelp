import React, { useState } from "react";

import add_photo from "../assets/add-photo.svg";
import close from "../assets/close.png";
import AddPhoto from "../components/AddPhoto";

const ReportForm = () => {
  const [name, setName] = useState("");
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const [otherText, setOtherText] = useState("");
  const [description, setDescription] = useState("");
  const [photoList, setPhotoList] = useState([]);
  const [isAddPhotoVisible, setIsAddPhotoVisible] = useState(false);

  const handleNameChange = (event) => setName(event.target.value);
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value !== "Other") setOtherText("");
  };
  const handleOtherTextChange = (event) => setOtherText(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const openAddPhoto = () => setIsAddPhotoVisible(true);
  const closeAddPhoto = () => setIsAddPhotoVisible(false);

  const handleAddPhoto = (photo) => {
    setPhotoList((prevList) => [
        ...prevList,
        { outline: `Image ${prevList.length + 1}`, image: photo },
    ]);
    console.log(photoList);
    
    closeAddPhoto();
};


  const handleDeletePhoto = (index) => {
    setPhotoList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[#FFFBE6] gap-5 py-20 font-sans font-normal">
      <p className="font-bold text-3xl lg:text-5xl text-[#626F47]">Report an Accident</p>

      {/* Nama, Jenis Kejadian, Deskripsi kejadian */}
      <div className="border border-gray-300 shadow-lg rounded-3xl bg-[#F2EED7] w-4/5 lg:w-1/2 h-fit flex flex-col px-8 lg:px-16 py-6 lg:py-12 gap-5">
        {/* Input Name */}
        <div className="input flex flex-col w-full h-fit gap-2">
          <p className="text-sm font-semibold text-[#626F47]">Name</p>
          <input
            type="text"
            className="border border-gray-300 rounded-md h-10 px-4 text-sm"
            placeholder="Input Reporter Name"
            value={name}
            onChange={handleNameChange}
          />
          <p className="text-2xs lg:text-xs text-gray-600">
            The reporter's name must be the real name as per the resident identity card.
          </p>
        </div>

        {/* Select Disaster Type */}
        <div className="input flex flex-col w-full h-fit gap-2">
          <p className="text-sm font-semibold text-[#626F47]">What's Happening?</p>
          <select
            className={`border border-gray-300 rounded-md h-10 px-4 text-sm ${
              selectedOption === "Select an option" && "text-gray-500"
            }`}
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="">Select an option</option>
            <option value="Fire">Fire</option>
            <option value="Flood">Flood</option>
            <option value="Earthquake">Earthquake</option>
            <option value="Other">Other</option>
          </select>
          {selectedOption === "Other" && (
            <input
              type="text"
              className="border border-gray-300 rounded-md h-10 px-4 text-sm mt-2"
              placeholder="Please specify"
              value={otherText}
              onChange={handleOtherTextChange}
            />
          )}
          <p className="text-2xs lg:text-xs text-gray-600">
            Report the type of disaster you see! Select the Other option if the disaster is not in the list of choices.
          </p>
        </div>

        {/* Input Description */}
        <div className="input flex flex-col w-full h-fit gap-2">
          <p className="text-sm font-semibold text-[#626F47]">Accident Description</p>
          <textarea
            className="border border-gray-300 rounded-md h-32 px-4 py-2 text-sm"
            placeholder="I saw this incident when . . ."
            value={description}
            onChange={handleDescriptionChange}
          />
          <p className="text-2xs lg:text-xs text-gray-600">
            Describe the disaster that occurred briefly! Include the important information needed!
          </p>
        </div>
      </div>

      {/* Add Photos Section */}
      <div className="border border-gray-300 shadow-lg rounded-3xl bg-[#F2EED7] w-4/5 lg:w-1/2 h-fit flex flex-col px-8 lg:px-16 py-6 lg:py-12 gap-3">
        <p className="text-sm font-semibold text-[#626F47]">Prove the accident by adding some photos about the location</p>
        <div className="bg-white p-8 rounded-md flex flex-col gap-2 w-full h-fit border">
          <div
            className="bg-[#D9D9D9] h-20 lg:h-28 flex justify-center items-center rounded-md p-4 cursor-pointer"
            onClick={openAddPhoto}
          >
            <img src={add_photo} alt="Add Photo" />
          </div>
          <div className="photo-list w-full h-fit flex flex-col gap-1">
            {photoList.map((photo, i) => (
              <div
                key={i}
                className="bg-[#F2EED7] rounded-sm border py-1 px-2 h-4 w-full flex justify-between items-center gap-2 overflow-hidden"
              >
                <p className="text-2xs text-[#626F47] bg-white rounded-md px-1 overflow-hidden w-full">
                  {photo.outline}
                </p>
                <img
                  src={close}
                  className="w-3 h-3 cursor-pointer"
                  alt="Delete Image"
                  onClick={() => handleDeletePhoto(i)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AddPhoto Component */}
      {isAddPhotoVisible && <AddPhoto onClose={closeAddPhoto} onCapture={handleAddPhoto} />}

      {/* Add Location Section */}
      <div className="border border-gray-300 shadow-lg rounded-3xl bg-[#F2EED7] w-4/5 lg:w-1/2 h-fit flex flex-col px-8 lg:px-16 py-6 lg:py-12 gap-3">
        <p className="text-sm font-semibold text-[#626F47]">Apakah ini lokasi Anda?</p>
        <div className="bg-white p-8 rounded-md flex flex-col gap-2 w-full h-fit border">
          <div
            className="bg-[#D9D9D9] h-20 lg:h-28 flex justify-center items-center rounded-md p-4 cursor-pointer"
            onClick={openAddPhoto}
          >
            <img src={add_photo} alt="Add Photo" />
          </div>
          <div className="photo-list w-full h-fit flex flex-col gap-1">
            {photoList.map((photo, i) => (
              <div
                key={i}
                className="bg-[#F2EED7] rounded-sm border py-1 px-2 h-4 w-full flex justify-between items-center gap-2 overflow-hidden"
              >
                <p className="text-2xs text-[#626F47] bg-white rounded-md px-1 overflow-hidden w-full">
                  {photo.outline}
                </p>
                <img
                  src={close}
                  className="w-3 h-3 cursor-pointer"
                  alt="Delete Image"
                  onClick={() => handleDeletePhoto(i)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end w-1/2">
        <button className="bg-[#ff4b4b] text-white text-lg font-bold px-8 py-1 rounded-lg shadow-lg border border-gray-400 hover:bg-[#e04343] transition duration-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default ReportForm;
