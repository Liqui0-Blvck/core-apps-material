import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import CategoriaForm from '@/componentes/categoria/CategoriaForm';

const ModalFormularioCategoria = () => {
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
      <button className='h-full rounded-md 
            mt-5 col-start-2 col-span-2
            border border-blue-600 hover:bg-blue-gray-100 transition
            ease-in text-blue-800 px-6 py-1'
        onClick={showModal}
      >Agregar Categoria</button>

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
export default ModalFormularioCategoria;