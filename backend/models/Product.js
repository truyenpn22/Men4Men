import mongoose from 'mongoose'

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is a required field'],
      minLength: [3, 'Please enter a name with atleast 3 characters'],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, 'sku is a required field'],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'category is a required field'],
    },
    price: {
      type: Number,
      required: [true, 'price is a required field'],
      min: [0, 'Price must be a positive number!'],
    },
    description: {
      type: String,
      required: [true, 'description is a required field'],
      minLength: [10, 'Please enter a description with atleast 10 characters'],
      trim: true,
    },
    image: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
