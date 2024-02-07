import React, { useState } from 'react';
import { Modal } from 'antd';
import SucursalFormulario from '@/componentes/sucursal/SucursalCard';

const ModalRegistroSucursal = ({id, refresh}) => {
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
      <button onClick={showModal} className='font-semibold text-center text-white'>Agregar Sucursal</button>

      <Modal title="Agregar Categoria" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}>
        <SucursalFormulario modalClose={setIsModalOpen} refresh={refresh} id={id}/>
      </Modal>
    </>
  );
};
export default ModalRegistroSucursal;