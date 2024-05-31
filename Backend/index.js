const express = require('express');
const database = require('./database')
const cors = require("cors")
const morgan = require("morgan")

//Configuracion
const app = express();

//Asignamos el valor al puerto 
app.set('port', 4000)
app.use(express.json());

//Comprobamos el puerto
app.listen(app.get('port'));
console.log("Conexión al puerto: " + app.get("port"));

app.use(morgan("dev"))

//Apis de prueba 

app.get("/product", async (req, res) => {
    const conexion = await database.getConexion();
    try {
        if (conexion) {
            const resultados = await conexion.query("select * from product ");
            if (resultados) {
                res.json(resultados)
            } else {
                res.status(404).json({ error: 'Error al obtener producto' })
            }
        } else {
            res.status(403).json({ error: 'Error de conexión a BDD' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Error' })
    }

})
app.get("/category", async (req, res) => {
    const conexion = await database.getConexion();
    try {
        if (conexion) {
            const resultados = await conexion.query("select * from category ");
            if (resultados) {
                res.json(resultados)
            } else {
                res.status(404).json({ error: 'Error al obtener producto' })
            }
        } else {
            res.status(403).json({ error: 'Error de conexión a BDD' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Error' })
    }

})

app.get("/product/:id", async (req, res) => {
    const conexion = await database.getConexion();
    try {
        if (conexion) {
            const { id } = req.params;
            const resultados = await conexion.query("select * from product where id = ? ", [id]);
            if (resultados) {
                res.json(resultados)
            } else {
                res.status(404).json({ error: 'Error al obtener producto' })
            }
        } else {
            res.status(403).json({ error: 'Error de conexión a BDD' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Error' })
    }

})

app.get("/category/:id", async (req, res) => {
    const conexion = await database.getConexion();
    try {
        if (conexion) {
            const { id } = req.params;
            const resultados = await conexion.query("select id ,name from category where id = ? ", [id]);
            if (resultados) {
                res.json(resultados)
            } else {
                res.status(404).json({ error: 'Error al obtener categoria' })
            }
        } else {
            res.status(403).json({ error: 'Error de conexión a BDD' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Error' })
    }
})

//Codigo para la prueba
app.get("/search/:id", async (req, res) => {
    const conexion = await database.getConexion();
    try {
        if (conexion) {
            const { id } = req.params;
            const resultados = await conexion.query('select tabla1.id_category , tabla1.name_category , p.name as name_product , p.category from product p inner join (select c.id as id_category, c.name as name_category from category c where id = ?) as tabla1 on tabla1.id_category = p.category',[id]);
            if (resultados) {
                res.json(resultados)
            } else {
                res.status(404).json({ error: 'Error al obtener información' })
            }
        } else {
            res.status(403).json({ error: 'Error de conexión a BDD' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Error' })
    }
})
