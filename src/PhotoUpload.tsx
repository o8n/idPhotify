import React, { ChangeEvent } from 'react';
import { Button } from '@mui/material';

interface PhotoUploadProps {
  onPhotoUpload: (photo: File) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoUpload }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPhotoUpload(e.target.files[0]);
    }
  };

  return (
    <Button variant="contained" component="label">
      写真をアップロード
      <input type="file" hidden onChange={handleChange} />
    </Button>
  );
};

export default PhotoUpload;
