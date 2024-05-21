import styled from "styled-components";

export const ArrowSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 5px solid #ccc;
  border-top-color: #3498db;
  border-radius: 50%;
  position: relative;
  animation: spin 1s infinite linear;

  &:before {
    content: "";
    position: absolute;
    top: 2px;
    left: 76%;
    transform: rotate(140deg);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 15px solid #3498db;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
