import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  )
  const mimetype = filetypes.test(file.mimetype)
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(new Error('Please upload an image file!'))
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 2000000,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     // console.log(req.file)
//     await sharp(req.file.path).resize({ width: 500, height: 400 })
//     res.send(`/${req.file.path}`)
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message })
//   }
// })

export default upload
