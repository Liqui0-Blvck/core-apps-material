import React from 'react'
import { Document, StyleSheet, View, Text, Page, Image, PDFViewer } from '@react-pdf/renderer'
import { format } from '@formkit/tempo';
import { useAuth } from '@/context/AuthContext';
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch';
import { useLocation } from 'react-router-dom';
import { urlNumeros } from '@/services/url_number';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 10,
  },
  head_box: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
  },
  head_box_1: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 20
  },
  head_box_left: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    height: '150px',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: 5
  },
  head_box_right: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    height: '150px',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: 5
  },
  input_style: {
    width: '100%',
    height: '70%',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    padding: '0 3px'
  },
  label: {
    fontWeight: 'bold',
    width: '100px',
    fontSize: '12px'
  },
  input_text: {
    borderRadius: '2px',
    border: '1px solid #E3E7EA',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    height: '25px',
    width: '70%',
    fontWeight: 'semibold',
    fontSize: 12,
    padding: '0 5px',
    overflow: 'hidden'
  },
  logo: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  info_bar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: '100%',
    backgroundColor: '#424242'
  },
  footer_box: {
    marginTop: '20px',
    border: '1px solid #E3E7EA',
    borderRadius: 2,
    height: '60%',
    width: '100%'
  },
  footer_header: {
    height: '30px',
    width: '100%',
    border: '1px solid #E3E7EA',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3px 5px'
  },
  items_box: {
    width: '100%',
    border: '1px solid #E3E7EA',
    height: '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});


const OrdenDeCompraPDF = () => {
  const { authTokens, validToken } = useAuth()
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)
  const { data: ordenCompra } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/orden-compra/${id}`
  )


  const { data: sucursalSeleccionado } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/proveedor/${ordenCompra && ordenCompra.proveedor}/sucursales/${ordenCompra && ordenCompra.sucursal}`
  )

  const { data: proveedor } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/proveedor/${ordenCompra && ordenCompra.proveedor}`
  )
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document width="500" height="500">
        <Page size="A4" style={styles.page}>
          <View style={styles.head_box}>
            <View style={styles.head_box_1}>


              <View style={styles.head_box_left}>
                <View style={{ width: '150px', height: '250px', position: 'relative', top: 0, right: 60 }}>
                  <Image source="/img/logosnabbit.jpg" style={styles.logo} />
                </View>
                <View style={styles.input_style}>
                  <Text style={styles.label}>Nombre Orden:</Text>
                  <View style={styles.input_text}>
                    <Text>{ordenCompra && ordenCompra.nombre}</Text>
                  </View>
                </View>

                <View style={styles.input_style}>
                  <Text style={styles.label}>N° cotización:</Text>
                  <View style={styles.input_text}>
                    <Text>{ordenCompra && ordenCompra.numero_cotizacion}</Text>
                  </View>
                </View>

                <View style={styles.input_style}>
                  <Text style={styles.label}>Proveedor:</Text>
                  <View style={styles.input_text}>
                    <Text>{ordenCompra && ordenCompra.proveedor_nombre}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.head_box_right}>
                <View style={{ height: 100 }}>

                </View>
                <View style={styles.input_style}>
                  <Text style={styles.label}>N° Orden:</Text>
                  <View style={styles.input_text}>
                    <Text>{ordenCompra && ordenCompra.numero_oc}</Text>
                  </View>
                </View>

                <View style={styles.input_style}>
                  <Text style={styles.label}>Fecha Orden:</Text>
                  <View style={styles.input_text}>
                    <Text>{ordenCompra && format(ordenCompra.fecha_orden, { date: 'full' }, 'es')}</Text>
                  </View>
                </View>

                <View style={styles.input_style}>
                  <Text style={styles.label}>Sucursal:</Text>
                  <View style={styles.input_text}>
                    <Text>{ordenCompra && ordenCompra.sucursal_nombre}</Text>
                  </View>
                </View>
              </View>

            </View>
            <View style={styles.head_box_1}>
              <View style={styles.head_box_left}>
                <View style={styles.info_bar}>
                  <Text style={{ color: 'white', fontSize: '12px' }}>Proveedor</Text>
                </View>
                <View style={styles.input_style}>
                  <Text style={styles.label}>Proveedor:</Text>
                  <View style={styles.input_text}>
                    <Text>{proveedor && proveedor.nombre}</Text>
                  </View>

                </View>

                <View style={styles.input_style}>
                  <Text style={styles.label}>Contacto:</Text>

                  <View style={styles.input_text}>
                    <Text>{proveedor && proveedor.contacto}</Text>
                  </View>
                </View>

                <View style={styles.input_style}>
                  <Text style={styles.label}>Correo:</Text>
                  <View style={styles.input_text}>
                    <Text>{proveedor && proveedor.correo}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.head_box_right}>
                <View style={styles.info_bar}>
                  <Text style={{ color: 'white', fontSize: '12px' }}>Sucursal</Text>
                </View>
                <View style={styles.input_style}>
                  <Text style={styles.label}>Nombre:</Text>
                  <View style={styles.input_text}>
                    <Text>{sucursalSeleccionado && sucursalSeleccionado.nombre}</Text>
                  </View>
                </View>

                <View style={styles.input_style}>
                  <Text style={styles.label}>Dirección:</Text>
                  <View style={styles.input_text}>
                    <Text>{sucursalSeleccionado && sucursalSeleccionado.direccion}</Text>
                  </View>
                </View>

                <View style={styles.input_style}>
                  <Text style={styles.label}>Región:</Text>
                  <View style={styles.input_text}>
                    <Text>{sucursalSeleccionado && sucursalSeleccionado.region_nombre}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.footer_box}>
            <View style={styles.footer_header}>
              <View style={{ width: '50%' }}>
                <Text style={{ fontSize: '12px', position: 'relative', left: '70px' }}>Item</Text>
              </View>
              <View style={{ width: '30%' }}>
                <Text style={{ fontSize: '12px' }}>Cantidad</Text>
              </View>
              <View style={{ width: '30%' }}>
                <Text style={{ fontSize: '12px' }}>Costo</Text>
              </View>
              <View style={{ width: '30%' }}>
                <Text style={{ fontSize: '12px' }}>Observación</Text>
              </View>
            </View>

            <View>
              {
                ordenCompra && ordenCompra.items.map((item) => {
                  return (
                    <View key={item.id} style={styles.items_box}>
                      <View style={{ width: '100%', paddingLeft: '20px', textAlign: 'center' }}>
                        <Text style={{ fontSize: '12px' }}>{item.item_nombre}</Text>
                      </View>

                      <View style={{ width: '100%', paddingLeft: '80px' }}>
                        <Text style={{ fontSize: '12px' }}>{item.unidad_de_compra}</Text>
                      </View>

                      <View style={{ width: '100%', paddingLeft: '60px' }}>
                        <Text style={{ fontSize: '12px' }}>{item.costo_por_unidad}</Text>
                      </View>

                      <View style={{ width: '100%' }}>
                        <Text style={{ fontSize: '12px' }}>{item.observaciones}</Text>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default OrdenDeCompraPDF
