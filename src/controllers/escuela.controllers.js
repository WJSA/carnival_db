const pool = require('../db')

const getAllSchools = async (req, res, next) => {
    try {
        const allSchools = await pool.query('SELECT e.nombre, e.fechafundacion, e.direccion, e.resumenhistorico, l.nombrelugar FROM cgj_escuela_de_samba e INNER JOIN cgj_lugar l ON e.idlugar=l.idlugar')
        res.json(allSchools.rows)
    } catch(error) {
        next(error)
    }
}

const getSchool = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('SELECT e.nombre, e.fechafundacion, e.direccion, e.resumenhistorico, l.nombrelugar FROM cgj_escuela_de_samba e INNER JOIN cgj_lugar l ON e.idlugar=l.idlugar WHERE idescuela = $1', [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Escuela no encontrada'
        })

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const createSchool = async (req, res, next) => {
    const { idescuela, nombre, fechafundacion, direccion, resumenhistorico, idlugar } = req.body

    try {
        const result =  await pool.query('INSERT INTO cgj_escuela_de_samba (idescuela, nombre, fechafundacion, direccion, resumenhistorico, idlugar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
            idescuela, 
            nombre, 
            fechafundacion, 
            direccion, 
            resumenhistorico,
            idlugar
        ])
    
        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const updateSchool = async (req, res, next) => {
    const { nombre, fechafundacion, direccion, resumenhistorico, idlugar } = req.body
    const { id } = req.params
    try {
        const result =  await pool.query('UPDATE cgj_escuela_de_samba SET nombre = $1, fechafundacion = $2, direccion = $3, resumenhistorico = $4, idlugar = $5 WHERE idescuela = $6 RETURNING *', [
            nombre, 
            fechafundacion, 
            direccion, 
            resumenhistorico,
            idlugar,
            id
        ])
        if (result.rowCount === 0)
            return res.status(404).json({ message: "Escuela no encontrada Escuela" });          

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const deleteSchool = async (req, res, next) => {
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
}

module.exports = {
    getAllSchools,
    getSchool,
    createSchool,
    updateSchool,
    deleteSchool,
}