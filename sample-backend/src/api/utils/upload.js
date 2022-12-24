// multer
const fs = require('fs')
const multer = require('multer')
const imagesDir = `./src/uploads/images`

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imagesDir)
    },
    filename: function (req, file, cb) {
        var fileExtension = file.mimetype.split("/")[1]
        if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            return cb(new Error('Only image files are allowed.'))
        }
        cb(null, + Date.now() + '.' + fileExtension)
    }
  })

const upload = multer({ storage })
exports.cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'screenShot', maxCount: 1 }, { name: 'icon', maxCount: 1 }, { name: 'files', maxCount: 1 }, { name: 'manifestFile', maxCount: 1 }, { name: 'crashLog', maxCount: 1 },])
exports.uploadSingle = upload.single('image')

