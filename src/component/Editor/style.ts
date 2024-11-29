import styled from "styled-components";

export const EditorContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  textarea {
    min-height: 400px;
  }
`;

export const SentenceEditorContainer = styled(EditorContainer)`
  textarea {
    min-height: 50px;
  }

  display: flex;
  flex-direction: row;
  overflow: auto;
  gap: 0.5em;
`;
