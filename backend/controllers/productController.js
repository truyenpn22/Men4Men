import Product from '../models/Product.js'

// @desc Add new product
// @route POST '/api/products/add'
// @access Private : Admin
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json({ success: true, message: 'product added', product })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Get All products
// @route GET '/api/products/getAll'
// @access Public
export const getAllProducts = async (req, res) => {
  try {
    if (req.query.category) {
      const products = await Product.find({
        category: req.query.category,
      }).sort('-createdAt')
      return res.json({ success: true, products })
    }
    const products = await Product.find({}).sort('-createdAt')
    res.json({ success: true, products })
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false, error: err.message })
  }
}

// router.get("/products", async (req, res) => {
//   try {
//       if(req.query.category){
//         const studentsdata = await product.find({ category: req.query.category })
//         return res.status(200).send(studentsdata)
//       }
//     const studentsdata = await product.find({});
//     res.send(studentsdata);
//   } catch (e) {
//     res.send(e);
//   }
// });

// @desc Get One product
// @route GET '/api/products/:id'
// @access Public
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: 'Product not found' })
    }
    res.json({ success: true, product })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Update product
// @route PATCH '/api/products/:id'
// @access Private : Admin
export const updateProduct = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = [
    'name',
    'sku',
    'category',
    'price',
    'description',
    'image',
  ]
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation) {
    return res.status(400).json({ success: false, error: 'Invalid updates' })
  }

  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found' })
  }

  updates.forEach(update => (product[update] = req.body[update]))
  try {
    await product.save()
    res.json({ success: true, message: 'Product Updated!', product })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Delete a product
// @route DELETE  '/api/products/:id'
// @access Private : Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: 'Product not found' })
    }
    await product.remove()
    res.json({ success: true, message: 'product deleted' })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}
