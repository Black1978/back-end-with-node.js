const ApiError = require('../error/ApiError')


class UserController {
    async registration (req, res) {
        res.json('hiuuuu')
    }
    async login (req, res) {
        
    }
    async check (req, res, next) {
      const {id} = req.query
      if(!id) {
       return next(ApiError.badRequest('id not set'))
      }
      res.json(id)
    }
}
module.exports = new UserController ()