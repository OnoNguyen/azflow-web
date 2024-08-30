import { useEffect, useRef, useState } from "react";
import { EditorContainer, SaveButton } from "@/component/Editor/style.ts";

const TextEditor = ({
  onSave,
  initialContent,
  upperBound = 4000,
  lowerBound = 800,
}: {
  onSave: (content: string) => void;
  initialContent: string;
  upperBound?: number;
  lowerBound?: number;
}) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState(initialContent);
  const [contentLength, setContentLength] = useState(0);

  useEffect(() => {
    setContentLength(content.length);
  }, [content]);

  const handleSave = () => {
    if (editorRef.current) {
      onSave(content);
    }
  };

  // @ts-ignore
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const isWithinBounds =
    contentLength >= lowerBound && contentLength <= upperBound;

  return (
    <EditorContainer>
      <div>
        <textarea
          ref={editorRef}
          value={content}
          onChange={handleChange}
          style={{
            border: "1px solid #ccc",
            minHeight: "300px",
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
            resize: "none",
          }}
          placeholder={"Start typing here..."}
        ></textarea>
      </div>
      <div>
        <SaveButton onClick={handleSave} disabled={!isWithinBounds}>
          Upload
        </SaveButton>
        <p>
          Character count: {contentLength} (Limit: {lowerBound} - {upperBound})
        </p>
      </div>
    </EditorContainer>
  );
};

export default TextEditor;
