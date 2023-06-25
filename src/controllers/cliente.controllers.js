const pool = require('../db')

const getAllClient = async (req, res, next) => {
    try {
        const allSchools = await pool.query('SELECT * FROM cgj_cliente')
        res.json(allSchools.rows)
    } catch(error) {
        next(error)
    }
}

const getClient = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('SELECT primernombre, primerapellido, segundoapellido, dircorreoelec, fechanacimiento, docidentidad, segundonombre FROM cgj_cliente WHERE idcliente = $1', [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Cliente no encontrado'
        })

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const createClient = async (req, res, next) => {
    const { primernombre, primerapellido, segundoapellido, dircorreoelec, fechanacimiento, docidentidad, segundonombre} = req.body

    try {
        const result =  await pool.query('INSERT INTO cgj_cliente (primernombre, primerapellido, segundoapellido, dircorreoelec, fechanacimiento, docidentidad, segundonombre) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [
            primernombre, 
            primerapellido, 
            segundoapellido, 
            dircorreoelec, 
            fechanacimiento, 
            docidentidad, 
            segundonombre
        ])
    
        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const updateClient = async (req, res, next) => {
    const { primernombre, primerapellido, segundoapellido, dircorreoelec, fechanacimiento, docidentidad, segundonombre } = req.body
    const { id } = req.params
    try {
        const result =  await pool.query('UPDATE cgj_cliente SET primernombre=$1, primerapellido=$2, segundoapellido=$3, dircorreoelec=$4, fechanacimiento=$5, docidentidad=$6, segundonombre=$7 WHERE idcliente = $8 RETURNING *', [
            primernombre, 
            primerapellido, 
            segundoapellido, 
            dircorreoelec, 
            fechanacimiento, 
            docidentidad, 
            segundonombre,
            id
        ])
        if (result.rowCount === 0)
            return res.status(404).json({ message: "Cliente no encontrado" });          

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}
/*
const deleteClient = async (req, res, next) => {
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
    getAllClient,
    getClient,
    createClient,
    updateClient,
//    deleteClient,
}