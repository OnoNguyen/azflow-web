import React, {useCallback, useState} from "react";
import Cropper from "react-easy-crop";
import {PrimaryButton, SecondaryButton} from "@/component/BaseStyle.ts";
import {ImageGenArea} from "@/page/create/imageGenArea.tsx";
import getCroppedImg from "@/utils/croppedImage.ts";

interface IImageArea {
  id: number;
  sentence: string;
}

const TARGET_WIDTH = 1024;
const TARGET_HEIGHT = 1790;

export const ImageArea = ({id, sentence}: IImageArea) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(
    `${import.meta.env.VITE_API_URL}/video/${id}.png?t=${Date.now()}`,
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setImageSrc(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = useCallback(async (_, croppedAreaPixels) => {
    if (!imageSrc) return;
    const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
    setCroppedImage(croppedImg);
  }, [imageSrc]);
  const uploadCroppedImage = async () => {
    if (!croppedImage) return;

    const response = await fetch(croppedImage);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("file", blob, `${id}.png`);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/video/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      alert("File uploaded successfully");
      setCroppedImage(
        `${import.meta.env.VITE_API_URL}/video/${id}.png?t=${Date.now()}`,
      );
      setImageSrc(null); // Reset cropper
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5em",
      }}
    >
      {imageSrc ? (
        <div
          style={{
            position: "relative",
            width: "300px",
            height: "400px",
          }}
        >
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={TARGET_WIDTH / TARGET_HEIGHT}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
          <div style={{position: "relative", display: "flex", justifyContent: "space-between", padding: "0.5em"}}>
            <PrimaryButton onClick={uploadCroppedImage}>Upload</PrimaryButton>
            <SecondaryButton onClick={() => setImageSrc(null)}>Cancel</SecondaryButton>
          </div>
        </div>
      ) : (
        <>
          <img
            width="200px"
            height="300px"
            src={croppedImage}
            alt="Image"
            onError={() => setCroppedImage("/path/to/placeholder-image.png")}
          />
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageUpload}
            style={{display: "none"}}
            id={`upload-input-${id}`}
          />
          <label htmlFor={`upload-input-${id}`}>
            <SecondaryButton as="span">Upload Image</SecondaryButton>
          </label>

          <ImageGenArea sentence={sentence} id={id} setImage={setCroppedImage}/>
        </>
      )}
    </div>
  );
};
