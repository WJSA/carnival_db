const pool = require('../db')

const getAllColors = async (req, res, next) => {
    try {
        const allColors = await pool.query('SELECT * FROM cgj_color')
        res.json(allColors.rows)
    } catch(error) {
        next(error)
    }
}

const getColor = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('SELECT * FROM cgj_color WHERE idcolor = $1', [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Color no encontrada'
        })

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const createColor = async (req, res, next) => {
    const { nombre} = req.body

    try {
        const result =  await pool.query('INSERT INTO cgj_color (nombre) VALUES ($1) RETURNING *', [ 
            nombre,
        ])
    
        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const updateColor = async (req, res, next) => {
    const { nombre} = req.body
    const { id } = req.params
    try {
        const result =  await pool.query('UPDATE cgj_color SET nombre = $1 WHERE idcolor = $2 RETURNING *', [
            nombre,
            id
        ])
        if (result.rowCount === 0)
            return res.status(404).json({ message: "Color no encontrado" });          

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

/*
const deleteColor = async (req, res, next) => {
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
*/


module.exports = {
    getAllColors,
    getColor,
    createColor,
    updateColor,
//    deleteColor,
}

