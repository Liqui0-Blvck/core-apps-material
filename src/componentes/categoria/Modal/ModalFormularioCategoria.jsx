import React, { useState } from 'react';
import { Modal } from 'antd';
import FormularioRegistroCategoria from '@/componentes/categoria/Formularios/FormularioRegistroCategoria';

const ModalFormularioCategoria = ({ refresh }) => {
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
      <button onClick={showModal} className='font-semibold'>Agregar Categoria</button>

      <Modal title="Agregar Categoria" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}>
        <FormularioRegistroCategoria modalClose={setIsModalOpen} refresh={refresh}/>
      </Modal>
    </>
  );
};
export default ModalFormularioCategoria;