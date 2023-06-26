const pool = require('../db')

const getAllReserva = async (req, res, next) => {
    try {
        const allReserva = await pool.query('SELECT r.n_reserva, r.estatus, r.fechahora, cl.primernombre, cl.primerapellido, cl.docidentidad, tp.tipo, tp.tipodesfile, tp.sector, tp.calidad, em.nombre , r.fechacancelacion, r.montototalr$ FROM cgj_reserva r INNER JOIN cgj_cliente cl ON r.idcliente=cl.idcliente INNER JOIN cgj_tipo_entrada tp ON r.idtipoentrada=tp.identrada INNER JOIN cgj_empresa em ON r.idempresa=em.idempresa')
        res.json(allReserva.rows)
    } catch(error) {
        next(error)
    }
}

const getReserva = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('SELECT r.n_reserva, r.estatus, r.fechahora, cl.primernombre, cl.primerapellido, cl.docidentidad, tp.tipo, tp.tipodesfile, tp.sector, tp.calidad, em.nombre , r.fechacancelacion, r.montototalr$ FROM cgj_reserva r INNER JOIN cgj_cliente cl ON r.idcliente=cl.idcliente INNER JOIN cgj_tipo_entrada tp ON r.idtipoentrada=tp.identrada INNER JOIN cgj_empresa em ON r.idempresa=em.idempresa WHERE n_reserva = $1', [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Reserva no encontrada'
        })

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const createReserva = async (req, res, next) => {
    const { estatus, fechahora, idcliente, idtipoentrada, idempresa, fechacancelacion, montototalr$} = req.body

    try {
        const result =  await pool.query('INSERT INTO cgj_reserva (estatus, fechahora, idcliente, idtipoentrada, idempresa, fechacancelacion, montototalr$) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [
            estatus, 
            fechahora, 
            idcliente, 
            idtipoentrada, 
            idempresa, 
            fechacancelacion, 
            montototalr$
        ])
    
        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const updateReserva = async (req, res, next) => {
    const { estatus, fechahora, idcliente, idtipoentrada, idempresa, fechacancelacion, montototalr$ } = req.body
    const { id } = req.params
    try {
        const result =  await pool.query('UPDATE cgj_reserva SET estatus=$1, fechahora=$2, idcliente=$3, idtipoentrada=$4, idempresa=$5, fechacancelacion=$6, montototalr$=$7 WHERE n_reserva = $8 RETURNING *', [
            estatus, 
            fechahora, 
            idcliente, 
            idtipoentrada, 
            idempresa, 
            fechacancelacion, 
            montototalr$,
            id
        ])
        if (result.rowCount === 0)
            return res.status(404).json({ message: "Reserva no encontrada" });          

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}
/*
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
}*/

module.exports = {
    getAllReserva,
    getReserva,
    createReserva,
    updateReserva,
//    deleteReserva,
}