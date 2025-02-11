import React, { useEffect, useState } from "react";
import { EditorContainer } from "@/component/Editor/style.ts";

const TextEditor = ({
  content,
  onContentChange,
  blinkIt = false, // New prop to control blinking
}: {
  content: string;
  onContentChange?: (content: string) => void;
  blinkIt?: boolean;
}) => {
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    setWordCount(
      content
        .trim()
        .replace("  ", " ")
        .split(" ")
        .filter((w) => w !== ".").length,
    );
    onContentChange?.(content);
  }, [content, onContentChange]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange?.(e.target.value);
  };

  return (
    <EditorContainer style={{ position: "relative" }}>
      <textarea
        value={content}
        onChange={handleChange}
        style={{
          border: blinkIt ? "2px solid green" : "1px solid #ccc", // Blink effect
          padding: "10px",
          borderRadius: "5px",
          width: "100%",
          minHeight: "400px",
          maxHeight: "1000px",
          overflow: "auto",
        }}
        placeholder={"Start typing here..."}
      ></textarea>
      <div>
        <p>Word count: {wordCount}</p>
      </div>
    </EditorContainer>
  );
};

export default TextEditor;
