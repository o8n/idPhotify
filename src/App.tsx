import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import PhotoUpload from './PhotoUpload';
import PhotoPreview from './PhotoPreview';

const App = () => {
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);

  const handlePhotoUpload = (photo: File) => {
    setUploadedPhoto(photo);
  };

  const handleDownload = (photo: string) => {
    const link = document.createElement('a');
    link.href = photo;
    link.download = 'id_photo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
