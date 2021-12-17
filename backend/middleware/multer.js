import path from 'path'
import multer from 'multer'

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     )
//   },
// })

const storage = multer.memoryStorage()

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

export default upload

/*
router.post("/createproduct", uploads.single('productImage') ,async function (req, res) {
  // const {name,sku,price,category,description} = req.body;
  console.log("req.file",req.file)
  console.log("req.body",req.body)

  fs.access('uploads',(err)=>{
    if(err){
      fs.mkdirSync('/uploads')
    }
  })

  const date= new Date();
  await sharp(req.file.buffer)
  .resize({width:400,height:400})
  .toFile(`uploads/${date.toString()}${req.file.originalname}`);
  
  const newProduct = await product.create({...req.body, productImage:`uploads/${date.toString()}${req.file.originalname}`});
  
  await category.updateMany(
    { _id: newProduct.category },
    { $push: { products: newProduct._id } }
  );
  return res.send(newProduct);
});
const storage=multer.memoryStorage();
const uploads = multer({storage});
*/
