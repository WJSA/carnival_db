const pool = require('../db')

const getAllPlaceEvents = async (req, res, next) => {
    try {
        const allPlaceEvents = await pool.query('SELECT * FROM cgj_lugar_evento')
        res.json(allPlaceEvents.rows)
    } catch(error) {
        next(error)
    }
}

const getPlaceEvent = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('SELECT nombre, direccion FROM cgj_lugar_evento WHERE idlugar_evento = $1', [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Lugar evento no encontrado'
        })

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const createPlaceEvent = async (req, res, next) => {
    const { nombre, direccion } = req.body

    try {
        const result =  await pool.query('INSERT INTO cgj_lugar_evento (nombre, direccion) VALUES ($1, $2) RETURNING *', [
            nombre, 
            direccion
        ])
    
        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const updatePlaceEvent = async (req, res, next) => {
    const { nombre, direccion } = req.body
    const { id } = req.params
    try {
        const result =  await pool.query('UPDATE cgj_lugar_evento SET nombre = $1, direccion = $2 WHERE idlugar_evento = $3 RETURNING *', [
            nombre, 
            direccion,
            id
        ])
        if (result.rowCount === 0)
            return res.status(404).json({ message: "Lugar evento no encontrado" });          

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}
/*
const deletePlaceEvent = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('DELETE FROM cgj_e_c WHERE idescuela = $1', [id])
        const result1 = await pool.query('DELETE FROM cgj_participacion WHERE fechainicio = (SELECT fechainicio FROM cgj_hist_grupo_escuela WHERE idescuela = $1)', [id])
        const result2 = await pool.query('DELETE FROM cgj_rol_persona WHERE fechainicio = (SELECT fechainicio FROM cgj_hist_grupo_escuela WHERE idescuela = $1)', [id])
        const result3 = await pool.query('DELETE FROM cgj_hist_grupo_escuela WHERE idescuela = $1', [id])
        const result4 = await pool.query('DELETE FROM cgj_artista WHERE idescuela = $1', [id])
        const result5 = await pool.query('DELETE FROM cgj_escuela_de_samba WHERE idescuela = $1', [id])

        if (result5.rowCount === 0)
            return res.status(404).json({ message: "Escuela no encontrada Escuela" });          

        res.json(result5.rows[0])

    } catch(error) {
        next(error)
    }
}*/

module.exports = {
    getAllPlaceEvents,
    getPlaceEvent,
    createPlaceEvent,
    updatePlaceEvent,
   // deletePlaceEvent,
}