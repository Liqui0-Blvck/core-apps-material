import React from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import Archivo from './Archivo'

const OrdenCompraPDF = () => {
  return (
    <PDFViewer>
      <Archivo />
    </PDFViewer>
  )
}

export default OrdenCompraPDF
