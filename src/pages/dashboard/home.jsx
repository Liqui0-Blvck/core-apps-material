
import { StatisticsCard } from "@/widgets/cards";
import { Skeleton } from "@mui/material";
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import { useState } from "react";

export function Home() {
  const [loading, setLoading] = useState(false)

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
                value={0}
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
                value={0}
              />
            )}
          
      </div>
      
    </div>
  );
}

export default Home;
