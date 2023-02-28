import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
// import {GlobalState} from '../GlobalState'
 

function UserAPI(token) {
    // const state = useContext(GlobalState)
    // const [token] = state.token
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const tokens = localStorage.getItem('token')

    // console.log("token userapi : ", tokens)
    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('http://localhost:3001/private/api/v1/user/infor', {
                        headers: {Authorization: 'Bearer ' + tokens}
                    })

                    setIsLogged(true)
                    // console.log("res userapi : ", res)

                    res.data.data.role === "Admin" ? setIsAdmin(true) : setIsAdmin(false)

                    setCart(res.data.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
            
        }
    },[token])

    

    const addCart = async (product) => {
        if(!isLogged) return alert("Please login to continue buying")

        console.log("addCart =>", product)
        const check = cart.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])
            console.log([...cart, {...product, quantity: 1}])
            await axios.patch('http://localhost:3001/private/api/v1/addToCart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: 'Bearer ' + token}
            })

        }else{
            alert("This product has been added to cart.")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory]
    }
}

export default UserAPI
 