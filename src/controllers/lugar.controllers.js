const pool = require('../db')

const getAllPlaces = async (req, res, next) => {
    try {
        const allPlaces = await pool.query('SELECT * from cgj_lugar')
        res.json(allPlaces.rows)
    } catch(error) {
        next(error)
    }
}

module.exports = {
    getAllPlaces,
}