import React, { useState } from 'react';
import { uploadProfilePicture } from '../services/api'; // Import your upload function

const ProfilePictureUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError(''); // Clear previous errors when selecting a new file
    setSuccessMessage(''); // Clear previous success messages

    // Validate file type and size (optional)
    if (selectedFile) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please select a valid image file (JPEG, PNG, or GIF).');
        setFile(null);
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { // Limit size to 5MB
        setError('File size must be less than 5MB.');
        setFile(null);
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true); // Start loading
    try {
      await uploadProfilePicture(formData); // Use the API function here
      setSuccessMessage('Profile picture uploaded successfully!');
      setFile(null); // Clear the file input
    } catch (err) {
      // Improve error handling to provide more feedback
      const errorMessage = err.message || 'Failed to upload the profile picture. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h3>Upload Profile Picture</h3>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {file && <p>Selected file: {file.name}</p>}
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default ProfilePictureUpload;
