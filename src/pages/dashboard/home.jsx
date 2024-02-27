import React, { useContext, useEffect, useState } from "react";

import { StatisticsCard } from "@/widgets/cards";
import AuthContext from "@/context/AuthContext";
import { useAuthenticatedFetch } from "@/hooks/useAuthenticatedFetch";
import { Skeleton } from "@mui/material";
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';

export function Home() {
  const {authTokens, validToken} = useContext(AuthContext)
  const { data: items} = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/items/`
  )

  const { data: ordenes, loading } = useAuthenticatedFetch(
    authTokens,
    validToken,
    `/api/orden-compra/`
  )


  const ordenes_filtered = ordenes && ordenes.filter(orden => orden.estado_oc_label === 'Aprobada')


  return (
    <div className="mt-14">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          
          {loading ? (
             <Skeleton variant="rectangular" width="100%" height='60%' className="rounded-md">
              <div style={{ paddingTop: '57%' }} />
            </Skeleton>
            ) : (
              <StatisticsCard
                title='Stock items'
                icon={<Inventory2RoundedIcon style={{ fontSize: '50px'}}/>}
                value={items ? items.length : 0}
              />
            )}  

          {loading ? (
            <Skeleton variant="rectangular" width="100%" height='60%' className="rounded-md">
              <div style={{ paddingTop: '20%' }} />
            </Skeleton>
            ) : (
              <StatisticsCard
                title='Ordenes Aprobadas'
                icon={<TextSnippetRoundedIcon style={{ fontSize: '50px'}}/>}
                value={ordenes_filtered ? ordenes_filtered.length : 0}
              />
            )}
          
      </div>
      
    </div>
  );
}

export default Home;
