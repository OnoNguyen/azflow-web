import styled from "styled-components";

export const SearchContainer = styled.div`
  position: relative;
  min-width: 80px;
  max-width: 300px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px 10px 35px;
  border: 2px solid #3498db;
  border-radius: 25px;
  font-size: 16px;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;

  &:focus {
    border-color: #2980b9;
    box-shadow: 0 0 8px rgba(41, 128, 185, 0.6);
    outline: none;
  }

  &::placeholder {
    color: #bbb;
    transition: color 0.3s;
  }

  &:focus::placeholder {
    color: #2980b9;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #3498db;
  pointer-events: none;
  transition: color 0.3s;

  ${SearchInput}:focus + & {
    color: #2980b9;
  }
`;
