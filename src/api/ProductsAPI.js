import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
// import {GlobalState} from '../GlobalState'



function ProductsAPI() {
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    // const state = useContext(GlobalState)
    // const [token] = state.token
    // console.log(state.token)
    const tokens = localStorage.getItem('token')
    // console.log(state)
    // console.log("===> ", tokens)


    useEffect(() =>{
        const getProducts = async () => {
            // const res = await axios.get(`http://localhost:3001/private/api/v1/profile?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
            // const res = await axios.get(`http://localhost:3001/private/api/v1/profile`)
            const res = await axios.get('http://localhost:3001/private/api/v1/Products', {
                headers: {Authorization: 'Bearer ' + tokens}
        })
            setProducts(res.data.result)
            // console.log(res.data.len_result)
            // console.log(res)
            setResult(res.data.len_result)
        }
        getProducts()
    },[callback, category, sort, search, page])
    // console.log(products)
    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default ProductsAPI
