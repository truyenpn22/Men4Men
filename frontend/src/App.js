import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Shop from './Pages/Shop'
import ShopSingle from './Pages/ShopSingle'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import ThankYou from './Pages/ThankYou'
import AdminDashboard from './AdminScreens/AdminDashboard'
import LoginScreen from './Pages/LoginScreen'
import Products from './AdminScreens/Products'
import Categories from './AdminScreens/Categories'
import Users from './AdminScreens/Users'
import AlertMessage from './components/AlertMessage'
import Loader from './components/Loader'
import productContext from './context/product/productContext'
import { useContext } from 'react'

function App() {
  // for product context
  const pContext = useContext(productContext)
  const { productsLoading, productsMessage, productsError } = pContext

  return (
    <main className="site-wrap">
      {/* <AlertMessage variant="success">Here is the alert message</AlertMessage> */}

      {productsLoading && <Loader />}
      {/* {productsMessage} */}

      {productsError && (
        <AlertMessage variant={productsError.variant}>
          {productsError.message}
        </AlertMessage>
      )}

      {productsMessage && (
        <AlertMessage variant={productsMessage.variant}>
          {productsMessage.message}
        </AlertMessage>
      )}

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/shopSingle/:id" element={<ShopSingle />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/Checkout" element={<Checkout />} />

        <Route path="/thankyou" element={<ThankYou />} />

        <Route path="/login" element={<LoginScreen />} />

        <Route path="/adminDashboard" element={<AdminDashboard />} />

        <Route path="/products" element={<Products />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/users" element={<Users />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App
