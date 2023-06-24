import { useEffect, useState } from "react"
import { Card, CardContent, Typography } from '@mui/material'

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
            {
                escuelas.map((escuela) => (
                    <Card>
                        <CardContent>
                            <Typography>{escuela.idescuela}</Typography>
                            <Typography>{escuela.nombre}</Typography>
                            <Typography>{escuela.fechafundacion}</Typography>
                            <Typography>{escuela.direccion}</Typography>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    )
}
