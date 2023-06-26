const pool = require('../db')

const getAllHistPrecio = async (req, res, next) => {
    try {
        const allHistPrecio = await pool.query('SELECT e.tipo, e.tipodesfile, e.sector, e.calidad, h.fechai, h.fechaf, h.costor$ FROM cgj_tipo_entrada e INNER JOIN cgj_hist_precio h ON e.identrada=h.idtipoentrada')
        res.json(allHistPrecio.rows)
    } catch(error) {
        next(error)
    }
}

const getHistPrecio = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('SELECT e.tipo, e.tipodesfile, e.sector, e.calidad, h.fechai, h.fechaf, h.costor$ FROM cgj_tipo_entrada e INNER JOIN cgj_hist_precio h ON e.identrada=h.idtipoentrada WHERE h.idtipoentrada = $1', [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Historico precio no encontrado'
        })

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const createHistPrecio = async (req, res, next) => {
    const { idtipoentrada, fechai, fechaf, costor$} = req.body

    try {
        const result =  await pool.query('INSERT INTO cgj_hist_precio (idtipoentrada, fechai, fechaf, costor$) VALUES ($1, $2, $3, $4) RETURNING *', [
            idtipoentrada, 
            fechai, 
            fechaf, 
            costor$
        ])
    
        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const updateHistPrecio = async (req, res, next) => {
    const { idtipoentrada, fechai, fechaf, costor$ } = req.body
    const { id } = req.params
    try {
        const result =  await pool.query('UPDATE cgj_hist_precio SET fechai = $1, fechaf = $2, costor$ = $3 WHERE idtipoentrada = $4 RETURNING *', [
            fechai, 
            fechaf,
            costor$,
            idtipoentrada 
        ])
        if (result.rowCount === 0)
            return res.status(404).json({ message: "Historico precio no encontrado" });          

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}
/*
const deleteHistPrecio = async (req, res, next) => {
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
    getAllHistPrecio,
    getHistPrecio,
    createHistPrecio,
    updateHistPrecio,
//    deleteHistPrecio,
}