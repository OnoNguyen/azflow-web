import { SecondaryButton } from "@/component/BaseStyle.ts";

export const ImageGenArea = ({ sentence }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <textarea
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          width: "100%",
          resize: "none",
        }}
        value={sentence}
      />
      <SecondaryButton onClick={() => {}}>Create Image</SecondaryButton>
    </div>
  );
};
