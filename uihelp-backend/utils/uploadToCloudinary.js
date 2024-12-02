const axios = require('axios');
const FormData = require('form-data');

async function uploadToCloudinary(base64Image) {
  const CLOUD_NAME = 'dvrb003sg'; // Ganti dengan cloud name Anda
  const API_KEY = '113351362399369'; // Ganti dengan API key Anda
  const API_SECRET = '8sr3HteeC_FjcO4uhY9YRDaqb7w'; // Ganti dengan API secret Anda
  const UPLOAD_PRESET = 'uihelp'; // Ganti dengan upload preset Anda

  const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/dvrb003sg/image/upload`;

  // Mengubah base64 menjadi buffer
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  const form = new FormData();
  form.append('file', buffer, { filename: 'image.jpg' }); // Ganti dengan nama file sesuai kebutuhan
  form.append('upload_preset', UPLOAD_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_UPLOAD_URL, form, {
      headers: {
        ...form.getHeaders(),
      },
      auth: {
        username: API_KEY,
        password: API_SECRET,
      },
    });

    return response.data; // Data dari Cloudinary
  } catch (error) {
    console.error('Cloudinary Error:', error.response?.data || error.message);
    throw new Error('Cloudinary upload failed: ' + error.message);
  }
}

module.exports = { uploadToCloudinary };
