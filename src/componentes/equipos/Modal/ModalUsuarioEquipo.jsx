import React, { useState } from 'react';
import { Modal } from 'antd';
import FormularioUsuarioEquipo from '../Formularios/FormularioUsuarioEquipo';

const ModalUsuarioEquipo = ({id, refresh}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      <button 
        onClick={showModal} 
        className='font-semibold text-center text-white'>Agregar Usuario</button>

      <Modal title="Editar Usuario"
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}>
        <FormularioUsuarioEquipo modalClose={setIsModalOpen} refresh={refresh} id={id}/>
      </Modal>
    </>
  );
};
export default ModalUsuarioEquipo;