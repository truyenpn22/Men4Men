import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <Router>
      <main className="site-wrap">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />

          <Route path="/about" element={<About />} exact />

          <Route path="/shop" element={<Shop />} exact />

          <Route path="/shopSingle" element={<ShopSingle />} exact />

          <Route path="/contact" element={<Contact />} exact />

          <Route path="/cart" element={<Cart />} exact />

          <Route path="/Checkout" element={<Checkout />} exact />

          <Route path="/thankyou" element={<ThankYou />} exact />

          <Route path="/login" element={<LoginScreen />} exact />

          <Route path="/adminDashboard" element={<AdminDashboard />} exact />

          <Route path="/products" element={<Products />} exact />

          <Route path="/categories" element={<Categories />} exact />

          <Route path="/users" element={<Users />} exact />
        </Routes>
        <Footer />
      </main>
    </Router>
  )
}

export default App
