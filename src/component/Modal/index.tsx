import React from "react";
import {
  CloseBtn,
  Modal as ModalWrapper,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./style";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>{title}</h3>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <CloseBtn onClick={onClose}>Close</CloseBtn>
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
