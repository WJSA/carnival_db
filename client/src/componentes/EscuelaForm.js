import { Button, CardContent, Card, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function EscuelaForm() {
  const [escuela, setEscuela] = useState({
    nombre: '',
    descripcion: '',
    resumen: ''
  });

  const [fechaFundacion, setFechaFundacion] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaEscuela = {
      ...escuela,
      fechafundacion: fechaFundacion
    };

    const res = await fetch('http://localhost:4000/escuelas', {
      method: 'POST',
      body: JSON.stringify(nuevaEscuela),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();
    console.log(data);
  };

  const handleFechaFundacionChange = (date) => {
    setFechaFundacion(date);
  };

  const handleChange = (e) => {
    setEscuela({ ...escuela, [e.target.name]: e.target.value });
  };

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{ backgroundColor: '#1e272e', padding: '1rem' }}>
          <Typography variant="h5" textAlign="center" color="white">
            Crear Escuela
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="nombre"
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="nombre"
                onChange={handleChange}
                inputProps={{
                  style: { color: 'white' }
                }}
                InputLabelProps={{
                  style: { color: 'white' }
                }}
              />

              <TextField
                variant="filled"
                label="Direccion"
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="descripcion"
                onChange={handleChange}
                inputProps={{
                  style: { color: 'white' }
                }}
                InputLabelProps={{
                  style: { color: 'white' }
                }}
              />

              <TextField
                variant="filled"
                label="Resumen"
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="resumen"
                onChange={handleChange}
                inputProps={{
                  style: { color: 'white' }
                }}
                InputLabelProps={{
                  style: { color: 'white' }
                }}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker name="fechafundacion" value={fechaFundacion} onChange={handleFechaFundacionChange} />
              </LocalizationProvider>

              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
