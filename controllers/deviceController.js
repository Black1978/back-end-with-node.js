const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
    async create(req, res, next) {
        console.log('hi')
        try {
            const { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + '.jpeg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({ name, price, brandId, typeId, img: fileName })
            if (info) {
                info = JSON.parse(info)
                info.forEach((element) =>
                    DeviceInfo.create({
                        title: element.title,
                        description: element.description,
                        deviceId: device.id,
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query
        limit = limit || 9
        page = page || 1
        const offset = limit * page - limit
        let devises
        if (!brandId && !typeId) {
            devises = await Device.findAndCountAll({ limit, offset })
        }
        if (brandId && !typeId) {
            devises = await Device.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && typeId) {
            devises = await Device.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (brandId && typeId) {
            devises = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset })
        }
        return res.json(devises)
    }
    async getOne(req, res) {
        const { id } = req.params
        const device = await Device.findOne({
            where: { id },
            include: [{ model: DeviceInfo, as: 'info' }],
        })
        res.json(device)
    }
    async deleteOne(req, res) {
        await Device.destroy({
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
module.exports = new DeviceController()
