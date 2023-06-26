const pool = require('../db')

const getAllCarnivals = async (req, res, next) => {
    try {
        const allCarnivals = await pool.query("SELECT ca.ano AÑO, to_char(ca.fechainicio, 'DD-MM-YYYY') FECHAINICIO, to_char(ca.fechafin, 'DD-MM-YYYY') FECHAFIN, l.primernombre || ' ' || l.primerapellido REYMOMO, y.primernombre || ' ' || y.primerapellido REINA FROM cgj_carnaval_anual ca INNER JOIN cgj_artista l ON ca.idreymomo=l.idartista INNER JOIN cgj_artista y ON ca.idreina=y.idartista")
        
        res.json(allCarnivals.rows)
    } catch(error) {
        next(error)
    }
}


const getCarnival = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query("SELECT ca.ano AÑO, to_char(ca.fechainicio, 'DD-MM-YYYY') FECHAINICIO, to_char(ca.fechafin, 'DD-MM-YYYY') FECHAFIN, l.primernombre || ' ' || l.primerapellido REYMOMO, y.primernombre || ' ' || y.primerapellido REINA FROM cgj_carnaval_anual ca INNER JOIN cgj_artista l ON ca.idreymomo=l.idartista INNER JOIN cgj_artista y ON ca.idreina=y.idartista WHERE ano = $1", [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Carnaval no encontrado'
        })

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const createCarnival = async (req, res, next) => {
    const { ano, fechainicio, idreymomo, idreina, fechafin } = req.body

    try {
        const result =  await pool.query('INSERT INTO cgj_carnaval_anual (ano, fechainicio, idreymomo, idreina, fechafin) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
            ano, 
            fechainicio, 
            idreymomo, 
            idreina, 
            fechafin
        ])
    
        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const updateCarnival = async (req, res, next) => {
    const { fechainicio, idreymomo, idreina, fechafin } = req.body
    const { id } = req.params
    try {
        const result =  await pool.query('UPDATE cgj_carnaval_anual SET fechainicio=$1, idreymomo=$2, idreina=$3, fechafin=$4 WHERE idescuela = $5 RETURNING *', [
            fechainicio, 
            idreymomo, 
            idreina, 
            fechafin,
            id
        ])
        if (result.rowCount === 0)
            return res.status(404).json({ message: "Carnaval no encontrado" });          

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}
/*
const deleteCarnival = async (req, res, next) => {
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
    getAllCarnivals,
    getCarnival,
    createCarnival,
    updateCarnival,
//    deleteCarnival,
}