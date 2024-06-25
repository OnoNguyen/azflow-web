import { css } from "styled-components";

const buttonStyle = css`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
`;

export const primaryButton = css`
  ${buttonStyle}
  background-color: #0077cc;
  color: white;
`;

export const secondaryButton = css`
  ${buttonStyle}
  background-color: #ccc;
  color: black;
`;
