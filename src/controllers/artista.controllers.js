const pool = require('../db')

const getAllArtists = async (req, res, next) => {
    try {
        const allArtists = await pool.query('SELECT h.idartista, h.primernombre, h.primerapellido, h.genero, h.docidentidad, e.nombre, h.segundonombre, h.segundoapellido FROM cgj_artista h LEFT JOIN cgj_escuela_de_samba e ON e.idescuela=h.idescuela')
        res.json(allArtists.rows)
    } catch(error) {
        next(error)
    }
}

const getArtist = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('SELECT h.primernombre, h.primerapellido, h.genero, h.docidentidad, e.nombre, h.segundonombre, h.segundoapellido FROM cgj_artista h LEFT JOIN cgj_escuela_de_samba e ON e.idescuela=h.idescuela WHERE h.idartista = $1', [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Artista no encontrado'
        })

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const createArtist = async (req, res, next) => {
    const { primernombre, primerapellido, genero, docidentidad, idescuela, segundonombre, segundoapellido } = req.body

    try {
        const result =  await pool.query('INSERT INTO cgj_artista (primernombre, primerapellido, genero, docidentidad, idescuela, segundonombre, segundoapellido) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [
            primernombre, 
            primerapellido, 
            genero, 
            docidentidad, 
            idescuela,
            segundonombre, 
            segundoapellido
        ])
    
        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const updateArtist = async (req, res, next) => {
    const { primernombre, primerapellido, genero, docidentidad, idescuela, segundonombre, segundoapellido } = req.body
    const { id } = req.params
    try {
        const result =  await pool.query('UPDATE cgj_artista SET primernombre=$1, primerapellido=$2, genero=$3, docidentidad=$4, idescuela=$5, segundonombre=$6, segundoapellido=$7 WHERE idartista = $8 RETURNING *', [
            primernombre, 
            primerapellido, 
            genero, 
            docidentidad, 
            idescuela,
            segundonombre, 
            segundoapellido,
            id
        ])
        if (result.rowCount === 0)
            return res.status(404).json({ message: "Artista no encontrado" });          

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}
/*
const deleteArtist = async (req, res, next) => {
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
    getAllArtists,
    getArtist,
    createArtist,
    updateArtist,
//    deleteArtist,
}