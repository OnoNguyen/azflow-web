import { useEffect, useRef, useState } from "react";
import { EditorContainer } from "@/component/Editor/style.ts";

const TextEditor = ({
  initialContent,
  onContentChange,
  upperBound = 4000,
  lowerBound = 800,
}: {
  initialContent: string;
  onContentChange?: (content: string) => void;
  upperBound?: number;
  lowerBound?: number;
}) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState(initialContent);
  const [contentLength, setContentLength] = useState(0);

  useEffect(() => {
    setContentLength(content.length);
    onContentChange?.(content);
  }, [content, onContentChange]);

  // @ts-ignore
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <EditorContainer>
      <div>
        <textarea
          ref={editorRef}
          value={content}
          onChange={handleChange}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
            resize: "none",
          }}
          placeholder={"Start typing here..."}
        ></textarea>
      </div>
      <div>
        <p>
          Word count: {contentLength} (Limit: {lowerBound} - {upperBound})
        </p>
      </div>
    </EditorContainer>
  );
};

export default TextEditor;
