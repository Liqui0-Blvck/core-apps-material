import React, { useState } from 'react';
import { Modal } from 'antd';
import FormularioRegistroSucursal from '@/componentes/sucursal/Formularios/FormularioRegistroSucursal';

const ModalRegistroSucursal = ({id}) => {
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
        width={1000}
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}>
        <FormularioRegistroSucursal modalClose={setIsModalOpen} id={id}/>
      </Modal>
    </>
  );
};
export default ModalRegistroSucursal;