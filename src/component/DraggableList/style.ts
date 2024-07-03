import styled, { css } from "styled-components";

export const List = styled.ul.withConfig({ displayName: "List" })`
  list-style: none;
  padding: 0;
  width: 300px;
`;

export const highlightStyles = css`
  background-color: #cce7ff;
  border-color: #0056b3;
`;

export const ListItem = styled.li<{ isDraggedOver: boolean }>`
  padding: 10px;
  margin: 5px 0;
  background-color: #f3f3f3;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: grab;

  ${({ isDraggedOver }) => isDraggedOver && highlightStyles}
`;
