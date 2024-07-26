import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  outline: none;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
  }
`;
