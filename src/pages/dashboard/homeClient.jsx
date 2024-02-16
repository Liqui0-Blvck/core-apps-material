import React, { useContext } from "react";

import { StatisticsCard } from "@/widgets/cards";

import AuthContext from "@/context/AuthContext";
import { useAuthenticatedFetch } from "@/hooks/useAuthenticatedFetch";
import { Skeleton } from "@mui/material";
import { FaClipboardUser } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";
import { RiComputerFill } from "react-icons/ri";
import { useClient } from "@/context/ClientContext";



export function HomeClient() {
  const {authTokens, validToken} = useContext(AuthContext)
  const { clientInfo } = useClient()
  const { data: usuarios, loading} = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/usuarios/?search=${clientInfo.id}`
  )

  const { data: tickets } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/tickets/?search=${clientInfo.id}`
  )

  const { data: equipos } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `http://127.0.0.1:8000/api/equipos/?search=${clientInfo.id}`
  )


  // const ordenes_filtered = ordenes && ordenes.filter(orden => orden.estado_oc_label === 'Aprobada')


  return (
    <div className="mt-14">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          
          {loading ? (
             <Skeleton variant="rectangular" width="100%" height='60%' className="rounded-md">
              <div style={{ paddingTop: '57%' }} />
            </Skeleton>
            ) : (
              <StatisticsCard
                title='Usuarios Registrados'
                icon={<FaClipboardUser style={{ fontSize: '50px'}}/>}
                value={usuarios && usuarios.length}
              />
            )}  

          {loading ? (
            <Skeleton variant="rectangular" width="100%" height='60%' className="rounded-md">
              <div style={{ paddingTop: '20%' }} />
            </Skeleton>
            ) : (
              <StatisticsCard
                title='Ticket Activos'
                icon={<IoTicket style={{ fontSize: '50px'}}/>}
                value={tickets && tickets.length}
              />
            )}

          {loading ? (
            <Skeleton variant="rectangular" width="100%" height='60%' className="rounded-md">
              <div style={{ paddingTop: '20%' }} />
            </Skeleton>
            ) : (
              <StatisticsCard
                title='Equipos Disponibles'
                icon={<RiComputerFill style={{ fontSize: '50px'}} />}
                value={equipos && equipos.length}
              />
            )}
          
      </div>
     
    </div>
  );
}

export default HomeClient;
