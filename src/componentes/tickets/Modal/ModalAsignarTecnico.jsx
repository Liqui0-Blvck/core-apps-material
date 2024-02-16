import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import FormularioAsignarTecnico from '../Formularios/FormularioAsignarTecnico';

const ModalAsignarTecnico = ({ id, refresh }) => {
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
      <button className='font-semibold text-center text-white' onClick={showModal}>Asignar Tecnico</button>
      <Modal title="Asignación Tecnico" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
        <FormularioAsignarTecnico id={id} refresh={refresh} modalClose={setIsModalOpen}/>
      </Modal>
    </>
  );
};
export default ModalAsignarTecnico;