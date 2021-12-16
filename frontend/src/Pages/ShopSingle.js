import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import productContext from '../context/product/productContext'
import { useCart } from 'react-use-cart'
import FeaturedProducts from '../components/FeaturedProducts'

const ShopSingle = () => {
  const { addItem } = useCart()

  const [quantity, setQuantity] = useState(1)

  const { id } = useParams()
  const [product, setProduct] = useState({ category: {} })

  // for product context
  const pContext = useContext(productContext)
  const { getOneProduct } = pContext

  useEffect(() => {
    const fetctProduct = async () => {
      const fetchedProduct = await getOneProduct(id)
      setProduct(fetchedProduct)
    }
    fetctProduct()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Breadcrumb pageName={product.name} />
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={product.image} alt="img" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h2 className="text-black">{product.name}</h2>
              <p>{product.description}</p>
              <p>
                <small className="text-secondary">
                  {product.category.title}
                </small>
              </p>
              <p>
                <strong className="text-primary h4">${product.price}</strong>
              </p>
              <div className="mb-1 d-flex">
                <label htmlFor="option-sm" className="d-flex mr-3 mb-3">
                  <span
                    className="d-inline-block mr-2"
                    style={{ top: '-2px', position: 'relative' }}>
                    <input type="radio" id="option-sm" name="shop-sizes" />
                  </span>{' '}
                  <span className="d-inline-block text-black">Small</span>
                </label>
                <label htmlFor="option-md" className="d-flex mr-3 mb-3">
                  <span
                    className="d-inline-block mr-2"
                    style={{ top: '-2px', position: 'relative' }}>
                    <input type="radio" id="option-md" name="shop-sizes" />
                  </span>{' '}
                  <span className="d-inline-block text-black">Medium</span>
                </label>
                <label htmlFor="option-lg" className="d-flex mr-3 mb-3">
                  <span
                    className="d-inline-block mr-2"
                    style={{ top: '-2px', position: 'relative' }}>
                    <input type="radio" id="option-lg" name="shop-sizes" />
                  </span>{' '}
                  <span className="d-inline-block text-black">Large</span>
                </label>
                <label htmlFor="option-xl" className="d-flex mr-3 mb-3">
                  <span
                    className="d-inline-block mr-2"
                    style={{ top: '-2px', position: 'relative' }}>
                    <input type="radio" id="option-xl" name="shop-sizes" />
                  </span>{' '}
                  <span className="d-inline-block text-black">
                    {' '}
                    Extra Large
                  </span>
                </label>
              </div>
              <div className="mb-5">
                <div className="input-group mb-3" style={{ maxWidth: '120px' }}>
                  <div className="input-group-prepend">
                    <button
                      disabled={quantity < 2}
                      className="btn btn-outline-primary js-btn-minus"
                      onClick={() => setQuantity(quantity - 1)}
                      type="button">
                      &minus;
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-primary js-btn-plus"
                      onClick={() => setQuantity(quantity + 1)}
                      type="button">
                      &#43;
                    </button>
                  </div>
                </div>
              </div>
              <p>
                <Link
                  to="/Cart"
                  className="buy-now btn btn-sm btn-primary"
                  onClick={() => {
                    let item = {
                      ...product,
                      id: product._id,
                    }
                    addItem(item, quantity)
                  }}>
                  Add To Cart
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <FeaturedProducts />
    </>
  )
}

export default ShopSingle
