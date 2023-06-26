const pool = require('../db')

const getAllHistGrupo = async (req, res, next) => {
    try {
        const allEnterprices = await pool.query('SELECT e.nombre, h.fechainicio, h.grupo, h.fechafin FROM cgj_escuela_de_samba e INNER JOIN cgj_hist_grupo_escuela h ON e.idescuela=h.idescuela')
        res.json(allEnterprices.rows)
    } catch(error) {
        next(error)
    }
}

const getHistGrupo1 = async (req, res, next) => {//Consulta por pk fechainicio + idescuela
    try {
        const { id,fecha } = req.params

        const result = await pool.query('SELECT e.nombre, h.fechainicio, h.grupo, h.fechafin FROM cgj_escuela_de_samba e INNER JOIN cgj_hist_grupo_escuela h ON e.idescuela=h.idescuela  WHERE h.idescuela=$1 AND h.fechainicio=$2', [id,fecha])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Historico no encontrado'
        })

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const getHistGrupo2 = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT e.nombre, h.fechainicio, h.grupo, h.fechafin FROM cgj_escuela_de_samba e INNER JOIN cgj_hist_grupo_escuela h ON e.idescuela=h.idescuela WHERE h.idescuela=$1',[id])
        res.json(result.rows)
    } catch(error) {
        next(error)
    }
}



const createHistGrupo = async (req, res, next) => {
    const { idescuela, fechainicio, grupo, fechafin } = req.body

    try {
        const result =  await pool.query('INSERT INTO cgj_hist_grupo_escuela (idescuela, fechainicio, grupo, fechafin) VALUES ($1, $2, $3, $4) RETURNING *', [
            idescuela, 
            fechainicio, 
            grupo, 
            fechafin
        ])
    
        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const updateHistGrupo = async (req, res, next) => {
    const { fechainicio, grupo, fechafin } = req.body
    const { id } = req.params
    try {
        const result =  await pool.query('UPDATE cgj_hist_grupo_escuela SET fechainicio=$1, grupo=$2, fechafin=$3 WHERE idescuela=$4 RETURNING*', [
            fechainicio, 
            grupo, 
            fechafin,
            id
        ])
        if (result.rowCount === 0)
            return res.status(404).json({ message: "Escuela inexistente" });          

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
    getAllHistGrupo,
    getHistGrupo1,
    getHistGrupo2,
    createHistGrupo,
    updateHistGrupo,
//    deleteEnterprice,
}