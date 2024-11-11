const [stream, setStream] = useState(null);
const [photo, setPhoto] = useState(null);
const videoRef = useRef(null);
const canvasRef = useRef(null);

const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    setPhoto(imageData);
    console.log("ini data foto : ", photo);

    stopCamera();
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

<div className="camera-section mt-4 flex flex-col items-center gap-3">
{!photo && (
  <>
    {!stream ? (
      <button
        onClick={startCamera}
        className="bg-[#ff4b4b] text-white px-4 py-2 rounded"
      >
        Open Camera
      </button>
    ) : (
      <div>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-auto rounded-md shadow-md"
        ></video>
        <button
          onClick={capturePhoto}
          className="bg-[#ff4b4b] text-white px-4 py-2 mt-3 rounded"
        >
          Capture Photo
        </button>
      </div>
    )}
    <label className="bg-[#ff4b4b] text-white px-4 py-2 mt-3 rounded cursor-pointer">
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />
      Upload from Gallery
    </label>
  </>
)}
{photo && (
  <div>
    <img
      src={photo}
      alt="Captured or Uploaded"
      className="w-full h-auto rounded-md shadow-md"
    />
    <button
      onClick={() => setPhoto(null)}
      className="bg-[#ff4b4b] text-white px-4 py-2 mt-3 rounded"
    >
      Remove Photo
    </button>
  </div>
)}
<canvas ref={canvasRef} style={{ display: "none" }}></canvas>
</div>