import React, { useState } from 'react';
import { Modal } from 'antd';
import FormularioEditableUsuario from '../Formularios/FormularioEditableUsuario';

const ModalCategoriaEditable = ({id, refresh}) => {
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
      <button onClick={showModal} className='w-full h-9 text-white font-semibold bg-blue-600 hover:bg-blue-400 rounded-md'>Editar</button>

      <Modal title="Editar Usuario"
        width={800}
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}>
        <FormularioEditableUsuario modalClose={setIsModalOpen} refresh={refresh} id={id}/>
      </Modal>
    </>
  );
};
export default ModalCategoriaEditable;