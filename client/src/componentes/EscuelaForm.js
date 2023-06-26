import { Button, CardContent, Card, Grid, TextField, Typography, Select, MenuItem, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function EscuelaForm() {
  const [escuela, setEscuela] = useState({
    nombre: '',
    direccion: '',
    resumenhistorico: '',
    idlugar: '',
    nombrelugar: '',
    Fechafundacion: ''
  });

  const [editing, setEditing] = useState(false)

  const [loading, setLoading] = useState(false)
  const [fechaFundacion, setFechaFundacion] = useState(null);
  const [lugares, setLugares] = useState([]); 

  const navigate = useNavigate()
  const params = useParams()

  
  const handleChange = (e) => {
    setEscuela({ ...escuela, [e.target.name]: e.target.value });
  };

  const loadSchool = async (id) => {
    const res = await fetch(`http://localhost:4000/escuelas/${id}`)
    const data = await res.json()
    console.log(data);
    setEscuela({nombre: data.nombre, direccion: data.direccion, resumenhistorico: data.resumenhistorico, idlugar: data.idlugar, nombrelugar: data.nombrelugar, Fechafundacion: data.fechafundacion}); // Actualizar el estado con los datos completos de la escuela
    setEditing(true)
  }
  
  useEffect(() => {
    if (params.id) {
      console.log(params.id)
      loadSchool(params.id)
    }

    const fetchLugares = async () => {
      try {
        const res = await fetch('http://localhost:4000/lugares'); 
        const data = await res.json();
        setLugares(data);
      } catch (error) {
        console.error('Error al cargar los lugares:', error);
      }
    };

    fetchLugares();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    //const nuevaEscuela = {
    //  ...escuela,
    //  fechafundacion: fechaFundacion
    //};
     
    let nuevaEscuela = {
      ...escuela
    };

    if (fechaFundacion !== null) {
      nuevaEscuela.fechafundacion = fechaFundacion;
    }else{
      nuevaEscuela.fechafundacion = escuela.Fechafundacion;
    }

    if (editing) {
      await fetch(`http://localhost:4000/escuelas/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(nuevaEscuela),
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      await fetch('http://localhost:4000/escuelas', {
        method: 'POST',
        body: JSON.stringify(nuevaEscuela),
        headers: { 'Content-Type': 'application/json' }
      });
    }

    setLoading(false)
    navigate('/')
  };

  const handleFechaFundacionChange = (date) => {
    setFechaFundacion(date);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh', backgroundColor: '#b3cde0' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card sx={{ mt: 5, borderRadius: 10, width: '100%', backgroundColor: '#E5F0FF' }} style={{ padding: '1rem' }}>
          <Typography variant="h5" textAlign="left" color="black" sx={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
            Crear Escuela
          </Typography>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                variant="filled"
                label="nombre"
                sx={{
                  display: 'block',
                  margin: '.5rem 0',
                  '& .MuiFilledInput-root': {
                    backgroundColor: '#E5F0FF',
                    width: '100%'
                  },
                  '& .MuiInputLabel-root': {
                    color: '#1e272e'
                  }
                }}
                name="nombre"
                value={escuela.nombre}
                onChange={handleChange}
              />

              <TextField
                variant="filled"
                label="Direccion"
                sx={{
                  display: 'block',
                  margin: '.5rem 0',
                  '& .MuiFilledInput-root': {
                    backgroundColor: '#E5F0FF',
                    width: '100%'
                  },
                  '& .MuiInputLabel-root': {
                    color: '#1e272e'
                  }
                }}
                name="direccion"
                multiline
                value={escuela.direccion}
                onChange={handleChange}
                
              />


              <TextField
                variant="filled"
                label="Resumen"
                sx={{
                  display: 'block',
                  margin: '.5rem 0',
                  '& .MuiFilledInput-root': {
                    backgroundColor: '#E5F0FF',
                    width: '100%'
                  },
                  '& .MuiInputLabel-root': {
                    color: '#1e272e'
                  }
                }}
                name="resumenhistorico"
                value={escuela.resumenhistorico}
                onChange={handleChange}
                multiline
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  name="fechafundacion" 
                  
                  value={escuela.fechafundacion} 
                  onChange={handleFechaFundacionChange} 
                  sx={{
                    '& input': {
                      color: 'black',
                      backgroundColor: '#E5F0FF'
                    },
                    '& label': {
                      color: 'black'
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'red'
                    },
                    width: '100%',
                    margin: '.5rem 0'
                  }}
                />
              </LocalizationProvider>


              {/* Lista desplegable de lugares */}
              <Select
                  value={escuela.idlugar}
                  onChange={handleChange}
                  name="idlugar"
                  variant="filled"
                  sx={{
                    display: 'block',
                    margin: '.5rem 0',
                    '& .MuiSelect-root': {
                      backgroundColor: '#E5F0FF',
                      color: '#1e272e',
                      textAlign: 'left',
                      width: '100%'
                    },
                    '& .MuiSelect-icon': {
                      color: '#1e272e'
                    },
                    '& .MuiInputBase-input': {
                      color: 'black',
                      backgroundColor: '#E5F0FF'
                    }
                  }}
              >
                <MenuItem value={escuela.idlugar}>{escuela.nombrelugar}</MenuItem>
                {lugares.map((lugar) => (
                  <MenuItem key={lugar.idlugar} value={lugar.idlugar} >
                    {lugar.nombrelugar}
                  </MenuItem>
                ))}
              </Select>

              <Button variant="contained" color="primary" type="submit" sx={{ marginTop: '1rem' }}>
                {loading ? (
                  <CircularProgress color='inherit' size={24} />
                ) : (
                  'Guardar'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}