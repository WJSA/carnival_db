import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AppBar, Toolbar, Typography } from '@mui/material'



export default function EmpresaList() {

    const  [empresas, setEmpresas] = useState([]) //Es el array donde se guardaran los json

    const loadEnterprices = async () => {
        const response = await fetch('http://localhost:4000/empresas')
        const data = await response.json()
        setEmpresas(data)
    }

   
    useEffect(() => {
        loadEnterprices() 
    }, [])


    return (
        <>
            <AppBar position="static" style={{backgroundColor: 'purple'}}>
                <Toolbar style={{justifyContent: 'center'}}>
                     <Typography variant="h3" align="center" style={{marginTop: '20px'}}>
                        Lista de empresas
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{backgroundImage: 'linear-gradient(to bottom, purple 30%, white 70%)', minHeight: '100vh',paddingTop: '50px', textAlign: 'center'}}>
                <TableContainer component={Paper} style={{ margin: 'auto', width: '80%',borderRadius: '30px' }}>
                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                        <TableHead >
                            <TableRow  style={{ background: 'lightgray'}}>
                                <TableCell align="center" colSpan={1} style={{border: '1px solid black'}}>Nombre</TableCell>
                                <TableCell align="center" colSpan={2}style={{border: '1px solid black'}}>emailcontacto</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {empresas.map((empresa) => (
                                <TableRow
                                    key={empresa.idempresa}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" style={{border: '1px solid black'}}>{empresa.nombre}</TableCell>
                                    <TableCell align="center" style={{border: '1px solid black'}}>{empresa.emailcontacto}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>               
        </>
    )
}