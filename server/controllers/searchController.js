let swag = require('../models/swag')

module.exports = {
    search: (req, res) => {
        let { category } = req.query

        if(!category) {
            res.status(200).send(swag)
        } else {
            let filteredSwag = swag.filter(swag => swag.category === category)
            res.status(200).send(filteredSwag)
        }
    }
}