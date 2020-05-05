const Auth = require('express').Router()
const multer = require('multer')
const AuthController = require('../controllers/Auth')
const AuthToken = require('../middleware/Auth')
const path = require('path')
const storage = multer.diskStorage({
  destination: 'files/',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({
  storage: storage,
  limits: { fileSize: 4194304 },
  fileFilter: function (req, file, cb) {
    const extensions = path.extname(file.originalname)
    if (extensions !== '.png' && extensions !== '.jpg' && extensions !== '.jpeg') {
      return cb(new Error())
    } else {
      cb(null, true)
    }
  }
}).single('picture')

const uploadImage = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      const data = {
        upload: false,
        msg: 'File to Large'
      }
      res.send(data)
    } else if (err instanceof Error) {
      const data = {
        upload: false,
        msg: 'Only image are allowed'
      }
      res.send(data)
    } else {
      next()
    }
  })
}

Auth.post('/picture', AuthController.register)

Auth.post('/register', uploadImage, AuthController.register)
Auth.get('/activate', AuthController.verify)
Auth.post('/login', AuthController.login)
Auth.post('/forgot-password', AuthController.forgetPass)

module.exports = Auth
