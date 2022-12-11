import mongoose from 'mongoose'

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên sản phẩm'],
      minLength: [3, 'Vui lòng nhập tên có ít nhất 3 ký tự'],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, 'Vui lòng nhập mã hàng hóa'],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Vui lòng nhập danh mục'],
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: [true, 'Vui lòng nhập thương hiệu'],
    },
    price: {
      type: Number,
      required: [true, 'Vui lòng nhập giá sản phẩm'],
      min: [0, 'Giá phải là một số dương!'],
    },
    description: {
      type: String,
      required: [true, 'Vui lòng nhập nhập mô tả'],
      minLength: [10, 'Vui lòng nhập mô tả với ít nhất 10 ký tự'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Vui lòng nhập hình ảnh'],
    },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
