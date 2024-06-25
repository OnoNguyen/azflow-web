import RichTextEditor from "@/component/Editor";

export const CreateEditor = () => {
  const handleSave = (content) => {
    console.log("Saved content:", content);
    // Call your GraphQL mutation here with the content
  };

  return (
    <div>
      <h1>Create New Content</h1>
      <RichTextEditor onSave={handleSave} />
    </div>
  );
};
