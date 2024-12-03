import React, { useEffect, useState } from "react";
import axios from "axios";

import add_photo from "../assets/add-photo.svg";
import close from "../assets/close.png";
import search from '../assets/search.png'
import AddPhoto from "../components/AddPhoto";
import UserLocationMap from "../components/UserLocationMap";
import { useLocation, useNavigate } from "react-router-dom";


const ReportForm = () => {

  const navigate = useNavigate();

  // state
  const location = useLocation();
  const { accidentName } = location.state || {};

  const [name, setName] = useState("");
  const [selectedOption, setSelectedOption] = useState(accidentName);
  const [otherText, setOtherText] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isAddPhotoVisible, setIsAddPhotoVisible] = useState(false);

  const accidents = ["Kebakaran", "Banjir", "Binatang Buas", "Laka Lantas", "Pohon Tumbang", "Kendaraan Rusak", "Pencurian", "Darurat Kesehatan"]

  const handleNameChange = (event) => setName(event.target.value);
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value !== "Other") setOtherText("");
  };
  const handleOtherTextChange = (event) => setOtherText(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const openAddPhoto = () => setIsAddPhotoVisible(true);
  const closeAddPhoto = () => setIsAddPhotoVisible(false);

  // const handleAddPhoto = (photo) => {
  //   setPhotoList((prevList) => [
  //     ...prevList,
  //     { outline: `Image ${prevList.length + 1}`, image: photo },
  //   ]);
  //   console.log(photoList);

  //   closeAddPhoto();
  // };

  const handleAddPhoto = (photo) => {
    setPhoto(photo); // Simpan foto yang dipilih
    console.log(photo);

    closeAddPhoto();
  };


  // const handleDeletePhoto = (index) => {
  //   setPhotoList((prevList) => prevList.filter((_, i) => i !== index));
  // };

  const handleDeletePhoto = () => {
    setPhoto(null); // Reset foto menjadi null
  };

  const [userLocation, setUserLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null); // Tambahkan state error
  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });

            // Reverse geocoding untuk mendapatkan alamat
            try {
              const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
              );
              setAddress(response.data.address);
            } catch (err) {
              console.error("Error fetching address:", err);
              setError("Gagal mendapatkan detail lokasi.");
            }
          },
          (err) => {
            setError("Gagal mendapatkan lokasi. Pastikan izin lokasi aktif.");
            console.error(err);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        setError("Browser Anda tidak mendukung Geolocation API.");
      }
    };

    fetchLocation();
  }, []);


  const handleSubmit = async () => {
    const reportData = {
      name: name,
      types: selectedOption === "Other" ? otherText : selectedOption,
      detail: description,
      picture: photo,
      location: userLocation.latitude + "," + userLocation.longitude,
    };

    console.log("Report Data: ", reportData);
    try {
      const response = await axios.post("http://localhost:5000/report/create", reportData);
      console.log("Response:", response.data);

      // Berikan notifikasi berhasil (opsional)
      alert("Report submitted successfully!");

      // Reset form setelah pengiriman
      setName("");
      setSelectedOption("Select an option");
      setOtherText("");
      setDescription("");
      setPhoto(null); // Reset foto

      navigate("/")
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report. Please try again.");

    }
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
            className={`border border-gray-300 rounded-md h-10 px-4 text-sm ${selectedOption === "Select an option" && "text-gray-500"
              }`}
            value={selectedOption}
            onChange={handleSelectChange}
          >
            {
              accidents.map((accident, i) => (
                <option key={i} value={accident}>{accident}</option>
              ))
            }
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

          {
            photo && (
              <div className="photo-list w-full h-fit flex flex-col gap-1">
                <div
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
              </div>
            )
          }
        </div>
      </div>

      {/* AddPhoto Component */}
      {isAddPhotoVisible && <AddPhoto onClose={closeAddPhoto} onCapture={handleAddPhoto} />}

      {/* Add Location Section */}
      <div className="border border-gray-300 shadow-lg rounded-3xl bg-[#F2EED7] w-4/5 lg:w-1/2 h-fit flex flex-col px-8 lg:px-16 py-6 lg:py-12 gap-3">
        <p className="text-sm font-semibold text-[#626F47]">Apakah ini lokasi Anda?</p>

        <div className="bg-white rounded-lg flex flex-col w-full h-fit border">
          {/* Tampilkan peta dan lokasinya disini */}
          <UserLocationMap userLocation={userLocation} address={address} />
        </div>

        <p className="text-slate-500">Lakukan refresh jika lokasimu tidak akurat!</p>
      </div>

      {/* Next Button */}
      <div className="flex justify-end w-1/2">
        <button className="bg-[#ff4b4b] text-white text-lg font-bold px-8 py-1 rounded-lg shadow-lg border border-gray-400 hover:bg-[#e04343] transition duration-300" onClick={handleSubmit}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ReportForm;
