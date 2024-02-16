import React, { useState } from 'react';
import { Button, Modal } from 'antd'; 
import FormularioItemContenedor from '../Formulario/FormularioItemContenedor';

const ModalContenedorItems = ({ id, refresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className='w-full h-full' onClick={showModal}>
        Agregar Item
      </Button>
      <Modal title="Agregar items a espacio" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
        <FormularioItemContenedor id={id} refresh={refresh} close={setIsModalOpen}/>
      </Modal>
    </>
  );
};
export default ModalContenedorItems;