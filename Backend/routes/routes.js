const express = require('express');
const database = require('./database')

//Configuracion
const app = express()

function getCategories() {
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
}

function getProducts() {
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
}

function getProductByID() {
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
}

function getCategoryByID() {
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
}
function searchByID(id) {
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

}

module.exports = { getCategories, getProducts, searchByID }