import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AppBar, Toolbar, Typography } from '@mui/material'


export default function EscuelaList() {

    const  [escuelas, setEscuelas] = useState([])

    const loadSchools = async () => {
        const response = await fetch('http://localhost:4000/escuelas')
        const data = await response.json()
        setEscuelas(data)
    }

    useEffect(() => {
        loadSchools()
    }, [])

    return (
        <>
            <AppBar position="static" style={{backgroundColor: 'purple'}}>
                <Toolbar style={{justifyContent: 'center'}}>
                     <Typography variant="h3" align="center" style={{marginTop: '20px'}}>
                        Lista de escuelas
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{backgroundImage: 'linear-gradient(to bottom, purple 30%, white 70%)', minHeight: '100vh',paddingTop: '50px', textAlign: 'center'}}>
                    <TableContainer component={Paper} style={{  marginBottom: '0'}}>
                        <Table sx={{ minWidth: 350, borderCollapse: 'collapse' }} aria-label="simple table">
                            <TableHead >
                                <TableRow style={{ background: 'lightgray'}}>
                                    <TableCell align="center" colSpan={1} style={{border: 'none'}}>Nombre</TableCell>
                                    <TableCell align="center" colSpan={1} style={{border: 'none'}}>Fecha</TableCell>
                                    <TableCell align="center" colSpan={1} style={{border: 'none'}}>Direccion</TableCell>
                                    <TableCell align="center" colSpan={1} style={{border: 'none'}}>Resumen</TableCell>
                                    <TableCell align="center" colSpan={1} style={{border: 'none'}}>Lugar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {escuelas.map((escuela) => (
                                    <TableRow
                                        key={escuela.idescuela}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" style={{border: '1px solid black'}}>{escuela.nombre}</TableCell>
                                        <TableCell align="center" style={{border: '1px solid black'}}>{escuela.fechafundacion}</TableCell>
                                        <TableCell align="center" style={{border: '1px solid black'}}>{escuela.direccion}</TableCell>
                                        <TableCell align="center" style={{border: '1px solid black'}}>{escuela.resumenhistorico}</TableCell>
                                        <TableCell align="center" style={{border: '1px solid black'}}>{escuela.nombrelugar}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <style>{`
                            ::-webkit-scrollbar {
                                width: 8px;
                                height: 8px;
                            }

                            ::-webkit-scrollbar-thumb {
                                background-color: RED;
                                border-radius: 4px;
                            }

                            ::-webkit-scrollbar-thumb:hover {
                                background-color: #555;
                            }

                            ::-webkit-scrollbar-track {
                                background-color: #eee;
                            }
                        `}
                        </style>
                    </TableContainer>
            </div>               
        </>
    )
}