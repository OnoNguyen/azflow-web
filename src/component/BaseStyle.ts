import styled, { css } from "styled-components";

const buttonStyle = css`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #ccc;
  }
`;

export const PrimaryButton = styled.button`
  ${buttonStyle};
  background-color: #0077cc;
  color: white;
`;

export const SecondaryButton = styled.button`
  ${buttonStyle};
  background-color: #ccc;
  color: black;
`;
