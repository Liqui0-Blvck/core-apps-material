import { Document, StyleSheet, View, Text, Page, Image, PDFViewer } from '@react-pdf/renderer'
import { format } from '@formkit/tempo';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch';
import { urlNumeros } from '@/services/url_number';


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
    height: '300px'
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
  footer_box: {
    marginTop: '100px',
    border: '0.5px solid #E3E7EA',
    borderRadius: 2,
    height: '60%',
    width: '100%'
  },
  footer_header: {
    height: '30px',
    width: '100%',
    border: '0.5px solid #E3E7EA',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3px 5px'
  },
  items_box: {
    width: '100%',
    border: '0.5px solid #E3E7EA',
    height: '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const GuiaSalidaPDF = () => {
  const { authTokens, validToken } = useAuth()
  const { pathname } = useLocation()
  const id = urlNumeros(pathname)
  const { data: guia } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/guia_salida/${id}/`
  )

  console.log(guia)

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
                  <Text style={styles.label}>Encargado:</Text>
                  <View style={styles.input_text}>
                    <Text>{guia && guia.encargado}</Text>
                  </View>
                </View>

                <View style={styles.input_style}>
                  <Text style={styles.label}>Destinatario:</Text>
                  <View style={styles.input_text}>
                    <Text>{guia && guia.destinatario}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.head_box_right}>
                <View style={{ height: 250 }}></View>

                <View style={styles.input_style}>
                  <Text style={styles.label}>Dirección:</Text>
                  <View style={styles.input_text}>
                    <Text>{guia && guia.direccion}</Text>
                  </View>
                </View>

                <View style={styles.input_style}>
                  <Text style={styles.label}>Fecha Orden:</Text>
                  <View style={styles.input_text}>
                    <Text>{guia && guia.nombre_receptor}</Text>
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
                  guia && guia.objetos_en_guia.map((obj) => {
                    return (
                      <View key={obj.id} style={styles.items_box}>
                        <View style={{ width: '100%', textAlign: 'center', position: 'relative', left: '10px' }}>
                          <Text style={{ fontSize: '12px' }}>{obj.articulo.map(objeto => objeto.nombre)}</Text>
                        </View>

                        <View style={{ width: '100%', paddingLeft: '80px' }}>
                          {/* <Text style={{ fontSize: '12px' }}>{item.unidad_de_compra}</Text> */}
                        </View>

                        <View style={{ width: '100%', paddingLeft: '60px' }}>
                          {/* <Text style={{ fontSize: '12px' }}>{item.costo_por_unidad}</Text> */}
                        </View>

                        <View style={{ width: '100%' }}>
                          {/* <Text style={{ fontSize: '12px' }}>{item.observaciones}</Text> */}
                        </View>
                      </View>
                    )
                  })
                }
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer >
  )
}

export default GuiaSalidaPDF