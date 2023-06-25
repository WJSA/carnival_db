const pool = require('../db')

const getAllTypes_tickets = async (req, res, next) => {
    try {
        const allTypes_tickets = await pool.query('SELECT * FROM cgj_tipo_entrada')
        res.json(allTypes_tickets.rows)
    } catch(error) {
        next(error)
    }
}

const getType_ticket = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('SELECT * FROM cgj_tipo_entrada WHERE identrada = $1', [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Tipo de entrada para desfile no encontrado'
        })

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}


const createType_ticket = async (req, res, next) => {
    const {tipo, sector, descripcion, tipodesfile, calidad, ubicacion } = req.body

    try {
        const result =  await pool.query('INSERT INTO cgj_tipo_entrada ( tipo, sector, descripcion, tipodesfile, calidad, ubicacion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
            tipo, 
            sector,
            descripcion,
            tipodesfile,
            calidad,
            ubicacion
        ])
    
        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const updateType_ticket = async (req, res, next) => {
    const { tipo, sector, descripcion, tipodesfile, calidad, ubicacion } = req.body
    const { id } = req.params
    try {
        const result =  await pool.query('UPDATE cgj_tipo_entrada SET tipo = $1, sector = $2, descripcion = $3, tipodesfile = $4, calidad = $5, ubicacion = $6 WHERE idempresa = $7 RETURNING *', [
            tipo, 
            sector, 
            descripcion, 
            tipodesfile, 
            calidad, 
            ubicacion,
            id
        ])
        if (result.rowCount === 0)
            return res.status(404).json({ message: "Empresa no encontrada" });          

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}


/*/ Falta revisar el delete de este lado
const deleteType_ticket = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('DELETE FROM cgj_empresa WHERE idescuela = $1', [id])

        if (result5.rowCount === 0)
            return res.status(404).json({ message: "Empresa no encontrada" });          

        res.json(result5.rows[0])

    } catch(error) {
        next(error)
    }
}*/

module.exports = {
    getAllTypes_tickets,
    getType_ticket,
    createType_ticket,
    updateType_ticket,
    //deleteType_ticket,
}