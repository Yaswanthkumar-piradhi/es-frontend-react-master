// import ProdCardB from "../components/productCard/productCardB"
import { useEffect, useState } from "react"
import Loading from "../components/loadingAnim"
import axios from "axios"
import { API } from "../App"
import { useNavigate } from "react-router-dom"
import OrdersCard from "../components/orders/ordersCard"
import Button from "../components/button"

export default function Orders() {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
  axios.defaults.headers.delete['x-access-token'] = localStorage.getItem('token')

  const [auth, setAuth] = useState(null)
  const [orders, setOrders] = useState(null)
  const navigate = useNavigate()

  const clearOrders = () => {
    axios
    .delete(`${API}/account/orders`)
    .then(res => {
      if(res.data.auth){
        getOrders()
      }
    })
  }

  const getOrders = () => {
    axios
      .get(`${API}/account/orders`)
      .then(res => {
        // console.log(res.data)
        if (res.data.auth) {
          setAuth(res.data.auth)
          setOrders(res.data.orders.orders)
        } else {
          navigate("/login", {
            state: {
              msg: "Login to continue"
            }
          })
        }
      })
  }

  useEffect(() => {
    getOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{
      boxSizing: "border-box",
      display: "grid",
    }}>
      <span style={{
        fontSize: "28px",
        fontWeight: "600",
        display: "flex",
        justifyContent: "center",
      }}>
        Your Orders
      </span>

      {
        auth && orders ?
          <div>
            <div style={{textAlign:'center'}}>
              <Button title="Clear orders" color='#666fff' onClick={clearOrders} />
            </div>
            <div style={{
              boxSizing: "border-box",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))",
              justifyContent: "space-evenly",
              gap: "20px",
              alignItems: "center",
              padding: "20px",
            }}>
              {
                orders.map(order => {
                  return (
                    <div style={{
                      boxShadow: "0px 0px 10px 1px #80808080",
                      border: "1px solid #808080",
                      display: "inline-grid"
                    }} key={order._id}>
                      <OrdersCard order={order} />
                    </div>
                  )
                })
              }
            </div>
          </div>
          : <Loading />
      }
    </div>
  )
}