const express = require('express');
const database = require('./database')
const morgan = require("morgan")


//Config
const app = express();

//Asignamos un puerto X
app.set('port', 4000)
app.use(express.json());

//Comprobamos el puerto
app.listen(app.get('port'));
console.log("PORT: " + app.get("port"));

app.use(morgan("dev"))

//Apis de prueba 
app.get("/products", async (req, res) => {
    const connection = await database.getConnection();
    if (connection) {
        try {
            const answ = await connection.query("select * from product ");
            if (answ) {
                res.json(answ)
            } else {
                res.status(404).json({ msg: 'Products not found ' })
            }

        } catch (err) {
            res.status(500).json({ msg: 'Internal Server Error ' })
        }
    } else {
        res.status(403).json({ msg: 'Connection error ' })
    }
})

app.get("/categories", async (req, res) => {
    const connection = await database.getConnection();
    if (connection) {
        try {
            const answ = await connection.query("select * from category ");
            if (answ) {
                res.json(answ)
            } else {
                res.status(404).json({ msg: 'Categories not found ' })
            }

        } catch (err) {
            res.status(500).json({ msg: 'Internal Server Error ' })
        }
    } else {
        res.status(403).json({ msg: 'Connection error ' })
    }
})

app.get("/product/:id", async (req, res) => {
    const connection = await database.getConnection();
    if (connection) {
        try {
            const { id } = req.params;
            if (id != null) {
                const answ = await connection.query("select * from product where id = ? ", [id]);
                if (answ) {
                    res.json(answ)
                } else {
                    res.status(404).json({ msg: 'Product not found' })
                }
            } else {
                res.json({ msg: "ID not found" })
            }

        } catch (err) {
            res.status(500).json({ msg: 'Internal Server Error ' })
        }
    } else {
        res.status(403).json({ msg: 'Connection error ' })
    }

})

app.get("/category/:id", async (req, res) => {
    const connection = await database.getConnection();
    if (connection) {
        try {
            const { id } = req.params;
            if (id != null) {
                const answ = await connection.query("select id ,name from category where id = ? ", [id]);
                if (answ) {
                    res.json(answ)
                } else {
                    res.status(404).json({ msg: 'Category not found' })
                }
            } else {
                res.json({ msg: "ID not found" })
            }

        } catch (err) {
            res.status(500).json({ msg: 'Internal Server Error ' })
        }
    } else {
        res.status(403).json({ msg: 'Connection error ' })
    }
})

//Codigo para la prueba

//Busqueda de los productos por categoria 
app.get("/search/:id", async (req, res) => {
    const connection = await database.getConnection();
    if (connection) {
        try {
            const { id } = req.params;
            if (id != null) {
                const answ = await connection.query('select tabla1.name_category , p.name as name_product , p.url_image , p.price , p.discount from product p inner join (select c.id as id_category, c.name as name_category from category c where id = ?) as tabla1 on tabla1.id_category = p.category', [id]);
                if (answ) {
                    res.json(answ)
                } else {
                    res.status(404).json({ msg: " Error getting information " })
                }
            } else {
                res.json({ msg: "ID not found " })
            }

        } catch (err) {
            res.status(500).json({ msg: 'Internal Server Error ' })
        }
    } else {
        res.status(403).json({ msg: 'connection error ' })
    }
})

