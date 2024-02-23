import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import { AspectRatio } from '@mui/icons-material';
import { useClient } from '@/context/ClientContext';
import { useNavigate } from 'react-router-dom';

export default function CardEnterprise({ cliente }) {
  const { setClient } = useClient()
  const navigate = useNavigate()

  const handleClickCard = () => {
    setClient(cliente)
    navigate('/app/home-clientes')
}
  
  return (
    <Card
      className=' hover:scale-105'
      sx={{
        width: 260,
        maxWidth: '100%',
        boxShadow: 'lg',
        cursor: 'pointer',
      }}

      onClick={() => {handleClickCard()}}>
      <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
      <div className='w-full h-40'>
          <img
            src={cliente.logo}
            className='mx-auto w-full object-cover h-full'
            alt=""
          />
        </div>
        <Chip
          size="sm"
          variant="soft"
          className={`${cliente.estado_cliente === 'Activo' ? 'bg-green-700' : 'bg-blue-200'}`}
        >
          {cliente.estado_cliente}
        </Chip>
        <Typography level="title-lg">{cliente.nombre}</Typography>
        <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
          {cliente.tipo_cliente } 
        </Typography>
      </CardContent>
    </Card>
  );
}