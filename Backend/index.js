const express = require('express');
const database = require('./database')
const morgan = require("morgan")
//Configuracion
const app = express();

//Asignamos un puerto X
app.set('port', 4000)
app.use(express.json());

//Comprobamos el puerto
app.listen(app.get('port'));
console.log("Conexión al puerto: " + app.get("port"));

app.use(morgan("dev"))

//Apis de prueba 

app.get("/products", async (req, res) => {
    const conexion = await database.getConexion();
    if (conexion) {
        try {
            const resultados = await conexion.query("select * from product ");
            if (resultados) {
                res.json(resultados)
            } else {
                res.status(404).json({ msg: 'Error al obtener productos' })
            }

        } catch (err) {
            res.status(500).json({ msg: 'Error' })
        }
    } else {
        res.status(403).json({ msg: 'Error de conexión a BDD' })
    }
})

app.get("/categories", async (req, res) => {
    const conexion = await database.getConexion();
    if (conexion) {
        try {
            const resultados = await conexion.query("select * from category ");
            if (resultados) {
                res.json(resultados)
            } else {
                res.status(404).json({ msg: 'Error al obtener categorias' })
            }

        } catch (err) {
            res.status(500).json({ msg: 'Error' })
        }
    } else {
        res.status(403).json({ msg: 'Error de conexión a BDD' })
    }
})

app.get("/product/:id", async (req, res) => {
    const conexion = await database.getConexion();
    if (conexion) {
        try {
            const { id } = req.params;
            if (id != null) {
                const resultados = await conexion.query("select * from product where id = ? ", [id]);
                if (resultados) {
                    res.json(resultados)
                } else {
                    res.status(404).json({ msg: 'Error al obtener producto' })
                }
            } else {
                res.json({ msg: "ID no encontrado" })
            }

        } catch (err) {
            res.status(500).json({ msg: 'Error' })
        }
    } else {
        res.status(403).json({ msg: 'Error de conexión a BDD' })
    }

})

app.get("/product/:category", async (req, res) => {
    const conexion = await database.getConexion();
    if (conexion) {
        try {
            const { category } = req.params;
            if (id != null) {
                const resultados = await conexion.query("select * from product where category = ? ", [category]);
                if (resultados) {
                    res.json(resultados)
                } else {
                    res.status(404).json({ msg: 'Error al obtener producto' })
                }
            } else {
                res.json({ msg: "ID no encontrado" })
            }

        } catch (err) {
            res.status(500).json({ msg: 'Error' })
        }
    } else {
        res.status(403).json({ msg: 'Error de conexión a BDD' })
    }

})

app.get("/category/:id", async (req, res) => {
    const conexion = await database.getConexion();
    if (conexion) {
        try {
            const { id } = req.params;
            if (id != null) {
                const resultados = await conexion.query("select id ,name from category where id = ? ", [id]);
                if (resultados) {
                    res.json(resultados)
                } else {
                    res.status(404).json({ msg: 'Error al obtener categoria' })
                }
            } else {
                res.json({ msg: "ID no encontrado" })
            }

        } catch (err) {
            res.status(500).json({ msg: 'Error' })
        }
    } else {
        res.status(403).json({ error: 'Error de conexión a BDD' })
    }
})

//Codigo para la prueba

//Busqueda de los productos por categoria 
app.get("/search/:id", async (req, res) => {
    const conexion = await database.getConexion();
    if (conexion) {
        try {
            const { id } = req.params;
            if (id != null) {
                const resultados = await conexion.query('select tabla1.name_category , p.name as name_product , p.url_image , p.price , p.discount from product p inner join (select c.id as id_category, c.name as name_category from category c where id = ?) as tabla1 on tabla1.id_category = p.category', [id]);
                if (resultados) {
                    res.json(resultados)
                } else {
                    res.status(404).json({ msg: "Error al obtener información" })
                }
            } else {
                res.json({ msg: "ID no encontrado" })
            }

        } catch (err) {
            res.status(500).json({ msg: 'Error' })
        }
    } else {
        res.status(403).json({ msg: 'Error de conexión a BDD' })
    }
})

