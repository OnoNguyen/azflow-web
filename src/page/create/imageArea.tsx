import React, { useState } from "react";
import { SecondaryButton } from "@/component/BaseStyle.ts";

interface IImageArea {
  id: number;
}

export const ImageArea = ({ id }: IImageArea) => {
  const [image, setImage] = useState(
    `${import.meta.env.VITE_API_URL}/video/${id}.png?t=${Date.now()}`,
  );

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Prepare the form data
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Send the file to the server
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/video/${id}`,
          {
            method: "POST",
            body: formData,
          },
        );

        // Handle server response
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        alert("File uploaded successfully");

        // Update image source to reflect the new upload
        setImage(
          `${import.meta.env.VITE_API_URL}/video/${id}.png?t=${Date.now()}`,
        );
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      }
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
      <img
        width="200px"
        height="300px"
        src={image}
        alt="Image"
        onError={() => setImage("/path/to/placeholder-image.png")} // Optional fallback
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{
          display: "none",
        }}
        id={`upload-input-${id}`}
      />
      <label htmlFor={`upload-input-${id}`}>
        <SecondaryButton as="span">Upload Image</SecondaryButton>
      </label>
    </div>
  );
};
