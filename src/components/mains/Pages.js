// import React  from 'react'
import React, {useContext} from 'react'

import {Routes, Route} from 'react-router-dom'
import Products from './products/Products'
import CreatedProducts from './creatProduct/CreatProduct'
import DetailProduct from './datailProduct/DetailProduct'
import Login from './auth/Login'
// import Register from './auth/Register'
// import OrderHistory from './history/OrderHistory'
import History from './History/History'
import Orders from './Orders/Orders'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
// import Categories from './categories/Categories'
// import CreateProduct from './createProduct/CreateProduct'

import {GlobalState} from '../../GlobalState'
// import NotFound from './utils/not_found/NotFound'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    
    return (
       
            <Routes>
                
                <Route path="/" element={isLogged === true?<Products/>:<Login />} />
                
                <Route path="/product" element={isLogged === true?<Products/>:<Login />} />

                <Route path="/create_product" element={isAdmin === true?<CreatedProducts/>:<NotFound />} />
                <Route path="/edit_product/:id" element={isAdmin === true?<CreatedProducts/>:<NotFound />} />

                <Route path="/detail/:id" element={<DetailProduct/>} />

                <Route path="/orders" element={isLogged === true?<Orders/>:<Login />} />
                <Route path="/history" element={isLogged === true?<History/>:<Login />} />

                <Route path="/login" element={isLogged === true?<Products/>:<Login />} />
                <Route path="/cart" element={<Cart/>} />
                
                <Route path="*" element={<NotFound />} />
                
            </Routes>
        
    )
}

export default Pages
