const pool = require('../db')

const getAllPlaces = async (req, res, next) => {
    try {
        const allPlaces = await pool.query('SELECT * from cgj_lugar')
        res.json(allPlaces.rows)
    } catch(error) {
        next(error)
    }
}

const getPlaces = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('SELECT nombrelugar, descripcion FROM cgj_lugar WHERE idlugar = $1', [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Lugar no encontrado'
        })

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const createPlaces = async (req, res, next) => {
    const {nombre, descripcion } = req.body

    try {
        const result =  await pool.query('INSERT INTO cgj_lugar (nombrelugar, descripcion) VALUES ($1, $2) RETURNING *', [
            nombre, 
            descripcion
        ])
    
        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const updatePlaces = async (req, res, next) => {
    const { nombre, descripcion } = req.body
    const { id } = req.params
    try {
        const result =  await pool.query('UPDATE cgj_lugar SET nombrelugar = $1, descripcion = $2 WHERE idlugar = $3 RETURNING *', [
            nombre, 
            descripcion,
            id
        ])
        if (result.rowCount === 0)
            return res.status(404).json({ message: "Lugar no encontrado" });          

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const deletePlaces = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('UPDATE cgj_escuela_de_samba set idlugar = 0 where idlugar = $1', [id])
        const result5 = await pool.query('DELETE FROM cgj_lugar WHERE idlugar = $1', [id])

        if (result5.rowCount === 0)
            return res.status(404).json({ message: "Lugar no encontrado" });          

        res.json(result5.rows[0])

    } catch(error) {
        next(error)
    }
}

module.exports = {
    getAllPlaces,
    getPlaces,
    createPlaces,
    updatePlaces,
    deletePlaces,
}