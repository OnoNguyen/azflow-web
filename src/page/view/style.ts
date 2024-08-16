import styled from "styled-components";
import { primaryButton } from "@/component/BaseStyle.ts";

export const ShareBtn = styled.button`
  ${primaryButton}
`;

export const CloseBtn = styled.button`
  ${primaryButton}
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  width: 300px;
  position: relative;
`;

export const ModalHeader = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid #e9ecef;
`;

export const ModalBody = styled.div`
  padding: 1rem;
`;

export const ModalFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: center;
`;
