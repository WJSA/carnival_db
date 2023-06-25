const pool = require('../db')

const getAllEnterprice = async (req, res, next) => {
    try {
        const allEnterprices = await pool.query('SELECT * FROM cgj_empresa')
        res.json(allEnterprices.rows)
    } catch(error) {
        next(error)
    }
}

const getEnterprice = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('SELECT nombre, emailcontacto FROM cgj_empresa WHERE idempresa = $1', [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Empresa no encontrada'
        })

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}


const createEnterprice = async (req, res, next) => {
    const { nombre, emailcontacto } = req.body

    try {
        const result =  await pool.query('INSERT INTO cgj_empresa (nombre, emailcontacto) VALUES ($1, $2) RETURNING *', [
            nombre, 
            emailcontacto
        ])
    
        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const updateEnterprice = async (req, res, next) => {
    const { nombre, emailcontacto } = req.body
    const { id } = req.params
    try {
        const result =  await pool.query('UPDATE cgj_empresa SET nombre = $1, emailcontacto = $2 WHERE idempresa = $3 RETURNING *', [
            nombre, 
            emailcontacto,
            id
        ])
        if (result.rowCount === 0)
            return res.status(404).json({ message: "Empresa no encontrada" });          

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}
/*
const deleteEnterprice = async (req, res, next) => {
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
    getAllEnterprice,
    getEnterprice,
    createEnterprice,
    updateEnterprice,
//    deleteEnterprice,
}