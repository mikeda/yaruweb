import React from 'react';
import Modal from 'react-modal';

const modalStyle = {
  content: {
    top: '20px',
    right: 'auto',
    bottom: 'auto',
    left: '50%',
    width: '80%',
    maxWidth: '350px',
    marginRight: '-50%',
    transform: 'translateX(-50%)',
  },
};

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const FormModal: React.FC<Props> = ({ isOpen, setIsOpen, children }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={modalStyle}>
      {children}
    </Modal>
  );
};
