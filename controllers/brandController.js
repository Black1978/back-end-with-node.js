const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
    async create(req, res) {
        const { name } = req.body
        const brand = await Brand.create({ name })
        return res.json(brand)
    }
    async getAll(req, res) {
        const brand = await Brand.findAll()
        return res.json(brand)
    }
    async deleteOne(req, res) {
        await Brand.destroy({
            where: { id: req.params.id },
        })
            .then(function (deletedRecord) {
                if (deletedRecord === 1) {
                    res.status(200).json({ message: 'Deleted successfully' })
                } else {
                    res.status(404).json({ message: 'record not found' })
                }
            })
            .catch(function (error) {
                res.status(500).json(error)
            })
    }
}

module.exports = new BrandController()
