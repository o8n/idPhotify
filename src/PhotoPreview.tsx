import React, { useRef, useEffect } from 'react';
import { Button } from '@mui/material';

interface PhotoPreviewProps {
  photo: string;
  onGeneratePhoto: (photo: string) => void;
}

const PhotoPreview: React.FC<PhotoPreviewProps> = ({ photo, onGeneratePhoto }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = photo;

      image.onload = () => {
        const aspectRatio = image.width / image.height;
        const targetWidth = 300; // 4cm (横)をピクセルに変換
        const targetHeight = 400; // 4cm (縦)をピクセルに変換
        const space = 20;

        const width = aspectRatio > 1 ? targetWidth : targetHeight * aspectRatio;
        const height = aspectRatio > 1 ? targetWidth / aspectRatio : targetHeight;

        canvas.width = 2 * width + space;
        canvas.height = 2 * height + space;

        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            ctx?.drawImage(image, j * (width + space), i * (height + space), width, height);
          }
        }
      };
    }
  }, [photo]);

  return (
    <>
      <canvas ref={canvasRef} style={{ margin: '20px 0', border: '1px solid black' }} />
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
