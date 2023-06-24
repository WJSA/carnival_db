import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

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
            <h1>Lista de escuelas</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Direccion</TableCell>
                                <TableCell>Resumen</TableCell>
                                <TableCell>Lugar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {escuelas.map((escuela) => (
                                <TableRow
                                    key={escuela.idescuela}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{escuela.nombre}</TableCell>
                                    <TableCell>{escuela.fechafundacion}</TableCell>
                                    <TableCell>{escuela.direccion}</TableCell>
                                    <TableCell>{escuela.resumenhistorico}</TableCell>
                                    <TableCell>{escuela.nombrelugar}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>       
        </>
    )
}
