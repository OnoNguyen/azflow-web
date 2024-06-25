import { CreateButton } from "./style.ts";
import { useNavigate } from "react-router-dom";

export const CreateButtonWrapper = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/create");
  };

  return (
    <CreateButton onClick={handleCreate}>
      <span className="material-symbols-outlined">stylus_note</span>
      <span>Create</span>
    </CreateButton>
  );
};
