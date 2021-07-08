const uuid = require('uuid')
const path = require('path')
const { Device } = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + '.jpeg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({ name, price, brandId, typeId, img: fileName })
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query
        limit = limit || 9
        page = page || 1
        let offset = limit * page - limit
        let devises
        

        if (!brandId && !typeId) {
            devises = await Device.findAll({limit, offset})
        }
        if (brandId && !typeId) {
            devises = await Device.findAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devises = await Device.findAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devises = await Device.findAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devises)
    }
    
}

module.exports = new DeviceController()
