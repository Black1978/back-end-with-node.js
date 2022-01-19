const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
    async create(req, res) {
        const { name } = req.body
        const type = await Type.create({ name })
        return res.json(type)
    }
    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
    async deleteOne(req, res) {
        const types = await Type.destroy({
            where: { id:req.params.id }
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
module.exports = new TypeController()
