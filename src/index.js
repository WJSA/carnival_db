const express = require('express')
const morgan = require('morgan');
const cors = require('cors')

const clienteRoutes = require('./routes/cliente.routes')
const escuelaRoutes = require('./routes/escuela.routes')
const empresaRoutes = require('./routes/empresa.routes')
const lugarRoutes = require('./routes/lugar.routes')
const colorRoutes = require('./routes/color.routes')
const tipo_entradaRoutes = require('./routes/tipo_entrada.routes')
const historicoRoutes = require('./routes/histprecio.routes')
const reservaRoutes = require('./routes/reserva.routes')

const app = express()

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(escuelaRoutes)
app.use(empresaRoutes)
app.use(lugarRoutes)
app.use(colorRoutes)
app.use(clienteRoutes)
app.use(tipo_entradaRoutes)
app.use(historicoRoutes)
app.use(reservaRoutes)

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

app.listen(4000)
console.log('Server on port 4000')