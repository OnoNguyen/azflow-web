import { useRef } from "react";

const RichTextEditor = ({ onSave }) => {
  const editorRef = useRef(null);

  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
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
            minHeight: "200px",
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
          }}
          placeholder={"Start typing here..."}
        ></textarea>
      </div>
      <button onClick={handleSave} style={{ marginTop: "10px" }}>
        Save
      </button>
    </div>
  );
};

export default RichTextEditor;
