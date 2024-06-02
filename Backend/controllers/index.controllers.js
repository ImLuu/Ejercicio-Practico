const database = require('../database')
const db= database.getConnection()

//controllers
//get all the products
exports.getProducts = async (req, res) => {
    const connection = await db;
    if (connection) {
        try {
            const answ = await connection.query("SELECT * FROM product");
            if (answ) {
               return res.send(answ);
            } else {
                return res.status(404).send({ msg: 'Products not found' });
            }
        } catch (err) {
            return res.status(500).send({ msg: 'Internal Server Error' });
        }
    } else {
        return res.status(403).send({ msg: 'Connection error' });
    }
};
//get all the categories
exports.getCategories = async (req, res) => {
    const connection = await db;
    if (connection) {
        try {
            const answ = await connection.query("select name from category ");
            if (answ) {
                return res.send(answ)
            } else {
                return res.status(404).send({ msg: 'Categories not found ' })
            }

        } catch (err) {
            return res.status(500).send({ msg: 'Internal Server Error ' })
        }
    } else {
        return res.status(403).send({ msg: 'Connection error ' })
    }
}

//get a specific product , search by ID
exports.getProductByID = async (req, res) => {
    const connection = await db;
    if (connection) {
        try {
            const { id } = req.params;
            if (id != null) {
                const answ = await connection.query("select * from product where id = ? ", [id]);
                if (answ) {
                    return res.send(answ)
                } else {
                    return res.status(404).send({ msg: 'Category not found' })
                }
            } else {
                return res.send({ msg: "ID not found" })
            }

        } catch (err) {
            return res.status(500).send({ msg: 'Internal Server Error ' })
        }
    } else {
        return res.status(403).send({ msg: 'Connection error ' })
    }
}

//get a specific category , search by ID
exports.getCategoryByID = async (req, res) => {
    const connection = await db;
    if (connection) {
        try {
            const { id } = req.params;
            if (id != null) {
                const answ = await connection.query("select * from category where id = ? ", [id]);
                if (answ) {
                    return res.send(answ)
                } else {
                    return res.status(404).send({ msg: 'Product not found' })
                }
            } else {
                return res.send({ msg: "ID not found" })
            }

        } catch (err) {
            return res.status(500).send({ msg: 'Internal Server Error ' })
        }
    } else {
        return res.status(403).send({ msg: 'Connection error ' })
    }

}

//get the info of all the products with the same ID , search by ID
exports.getSearchByID = async (req, res) => {
    const connection = await db;
    if (connection) {
        try {
            const { id } = req.params;
            if (id!= null) {
                const answ = await connection.query('select tabla1.name_category , p.name as name_product , p.url_image , p.price , p.discount from product p inner join (select c.id as id_category, c.name as name_category from category c where id = ?) as tabla1 on tabla1.id_category = p.category', [id]);
                if (answ) {
                    return res.send(answ)
                } else {
                    return res.status(404).send({ msg: " Error getting information " })
                }
            } else {
                return res.send({ msg: "ID not found " })
            }

        } catch (err) {
            return res.status(500).send({ msg: 'Internal Server Error ' })
        }
    } else {
        return res.status(403).send({ msg: 'connection error ' })
    }
}
