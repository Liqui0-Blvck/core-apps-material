import React, { useContext, useState } from 'react';
import { Modal } from 'antd';
import CategoriaEditableForm from '../Formularios/FormularioEditableCategoria';
import { WidthFull } from '@mui/icons-material';

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
      <button onClick={showModal} className='w-full h-8 text-white font-semibold bg-blue-600 rounded-md'>Editar</button>

      <Modal title="Agregar Categoria"
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}>
        <CategoriaEditableForm modalClose={setIsModalOpen} refresh={refresh} id={id}/>
      </Modal>
    </>
  );
};
export default ModalCategoriaEditable;