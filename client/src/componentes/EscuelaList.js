import { useEffect } from "react"

export default function EscuelaList() {

    const loadSchools = async () => {
        const response = await fetch('http://localhost:4000/escuelas')
        const data = await response.json()
        console.log(data)
    }

    useEffect(() => {
        loadSchools()
    }, [])

    return (
        <>
            <h1>Lista de escuelas</h1>
        </>
    )
}
