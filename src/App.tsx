import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import PhotoUpload from './PhotoUpload';
import PhotoPreview from './PhotoPreview';

const App = () => {
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  const handlePhotoUpload = (photo: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        setUploadedPhoto(e.target.result as string);
      }
    };
    reader.readAsDataURL(photo);
  };

  const handleDownload = (dataUrl: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'id_photo.png';
    link.click();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>証明写真作成サービス</Typography>
      <PhotoUpload onPhotoUpload={handlePhotoUpload} />
      {uploadedPhoto && <PhotoPreview photo={uploadedPhoto} onGeneratePhoto={handleDownload} />}
    </Container>
  );
};

export default App;
