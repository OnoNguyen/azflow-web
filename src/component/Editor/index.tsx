import { useRef } from "react";
import { primaryButton } from "@/component/BaseStyle.ts";
import styled from "styled-components";

const SaveButton = styled.button`
  ${primaryButton}
`;

const TextEditor = ({ onSave }) => {
  const editorRef = useRef(null);

  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.value;
      onSave(content);
    }
  };

  return (
    <div>
      <div>
        <textarea
          ref={editorRef}
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
        <SaveButton onClick={handleSave}>Generate</SaveButton>
      </div>
    </div>
  );
};

export default TextEditor;
