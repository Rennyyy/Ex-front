import React, {useContext, useState, useEffect} from 'react'
// import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/productItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
// import Filters from './Filters'
// import LoadMore from './LoadMore'


function Products() {
    const state = useContext(GlobalState)
    // const [products, setProducts] = state.productsAPI.products
    const [products] = state.productsAPI.products
    // const [isAdmin] = state.userAPI.isAdmin
    // const [token] = state.token
    // const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    // const [isCheck, setIsCheck] = useState(false)
    // console.log("product token : ", state.productsAPI.products)
    // const handleCheck = (id) =>{
    //     products.forEach(product => {
    //         if(product._id === id) product.checked = !product.checked
    //     })
    //     setProducts([...products])
    // }

    // useEffect(() =>{
    //     const prof =  axios.get('http://localhost:3001/private/api/v1/profile', {
    //         headers: {Authorization: 'Bearer' + token}
    //     })

    //     console.log("=======",prof)
        
    // })

    // const stProduct = async(id, public_id) => {
    //     try {
    //         setLoading(true)
    //         const prof = axios.post('/api/destroy', , {
    //             headers: {Authorization: `Bearer ${token}`}
    //         })
            

    //         await prof
    //         // setCallback(!callback)
    //         setLoading(false)
            
    //     } catch (err) {
    //         alert(err.response.data.msg)
    //     }
    // }

    // const checkAll = () =>{
    //     products.forEach(product => {
    //         product.checked = !isCheck
    //     })
    //     setProducts([...products])
    //     setIsCheck(!isCheck)
    // }

    // const deleteAll = () =>{
    //     products.forEach(product => {
    //         if(product.checked) deleteProduct(product._id, product.images.public_id)
    //     })
    // }
    // console.log(products)
    if(loading) return <div><Loading /></div>
    return (
        <>

        <div className="products">
            { products === null ? <Loading /> : products.map(product => {
                    return <ProductItem key={product._id} product={product} />
                })
            } 
        </div>

        {/* <LoadMore /> */}
        {/* {products.length === 0 && <Loading />} */}
        </>
    )
}

export default Products
