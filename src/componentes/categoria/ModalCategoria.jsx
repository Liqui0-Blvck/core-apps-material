import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import CategoriaForm from '@/componentes/categoria/CategoriaForm';

const ModalCategoria = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <button onClick={showModal}>Agregar Categoria</button>

      <Modal title="Agregar Categoria" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}>
        <CategoriaForm modalClose={setIsModalOpen}/>
      </Modal>
    </>
  );
};
export default ModalCategoria;