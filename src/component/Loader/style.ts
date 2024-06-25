import styled from "styled-components";

export const GradientSpinner = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(0deg, #3498db 0%, transparent 100%);
  animation: spin 1s infinite linear;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  > div {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: white;
    position: relative;
    top: 5px;
    left: 5px;
  }
`;

export const ArrowSpinner = styled.div`
  width: 2em;
  height: 2em;
  border: 0.2em solid #ccc;
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
    border-left: 0.2em solid transparent;
    border-right: 0.2em solid transparent;
    border-bottom: 0.3em solid #3498db;
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
