import './App.css'
import React from 'react'
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
import Brands from './AdminScreens/Brands'
import Users from './AdminScreens/Users'
import Misc from './components/Misc'
import SignupScreen from './Pages/SignupScreen'
import ProfileScreen from './Pages/ProfileScreen'
import Orders from './AdminScreens/Orders'
import MyOrderDetails from './Pages/MyOrderDetails'
import ProductDetails from './AdminScreens/ProductDetails'
import OrderDetails from './AdminScreens/OrderDetails'

function App() {
  return (
    <main className="site-wrap">
      <Misc />
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

        <Route path="/signup" element={<SignupScreen />} />

        <Route path="/profile" element={<ProfileScreen />} />

        <Route path="/myOrderDetails/:id" element={<MyOrderDetails />} />

        <Route path="/adminDashboard" element={<AdminDashboard />} />

        <Route path="/products" element={<Products />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/brands" element={<Brands />} />

        <Route path="/users" element={<Users />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/productDetailsAdmin/:id" element={<ProductDetails />} />

        <Route path="/orderDetailsAdmin/:id" element={<OrderDetails />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App
