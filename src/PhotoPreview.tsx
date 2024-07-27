import React, { useEffect, useRef } from 'react';
import { Button } from '@mui/material';

interface PhotoPreviewProps {
  photo: File;
  onGeneratePhoto: (photo: string) => void;
}

const PhotoPreview: React.FC<PhotoPreviewProps> = ({ photo, onGeneratePhoto }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = new Image();

    img.onload = () => {
      if (canvas && ctx) {
        const width = 300;  // 3cm in pixels
        const height = 400; // 4cm in pixels
        const margin = 40;  // Margin between photos

        canvas.width = width * 2 + margin * 3;
        canvas.height = height * 2 + margin * 3;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            ctx.drawImage(img, margin + i * (width + margin), margin + j * (height + margin), width, height);
          }
        }

        onGeneratePhoto(canvas.toDataURL('image/png'));
      }
    };

    img.src = URL.createObjectURL(photo);
  }, [photo, onGeneratePhoto]);

  return (
    <>
      <canvas ref={canvasRef} style={{ margin: '20px 0' }} />

        <Button variant="contained" color="primary" onClick={() => {
          if (canvasRef.current) {
            onGeneratePhoto(canvasRef.current.toDataURL('image/png'));
          }
          }}>
          写真をダウンロード
        </Button>
    </>
  );
};

export default PhotoPreview;
