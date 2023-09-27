import axios from "axios"
import { useState, useEffect } from "react"
import Button from "../button"
import { API } from "../../App"
import { useNavigate, useLocation } from "react-router-dom"
import Loading from "../loadingAnim"

export default function SelectPayment() {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
  axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')

  const [method, setMethod] = useState(null)
  const [card, setCard] = useState(false)
  const [cod, setCod] = useState(false)
  const [upi, setUpi] = useState(false)
  const [auth, setAuth] = useState(false)
  const [msg, setMsg] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const click = (value) => {
    setMethod(value)
    if (value === "card") {
      setCard(true)
      setUpi(false)
      setCod(false)
    }
    else if (value === "cod") {
      setCard(false)
      setUpi(false)
      setCod(true)
    } else if (value === "upi") {
      setCard(false)
      setUpi(true)
      setCod(false)
    }
  }

  const placeOrder = () => {
    // console.log(method)
    if (method) {
      axios
        .post(`${API}/account/buy`, { info: location.state, method })
        .then(res => {
          console.log(res)
          if (res.data.auth) {
            navigate('/orders', {
              state: {
                message: res.data.message
              }
            })
          } else {
            setMsg(res.data.message)
          }
        })
    } else {
      setMsg("Please select an option")
    }
  }

  const verifyUser = () => {
    axios
      .get(`${API}/account/verify`)
      .then(res => {
        if (res.data.auth && location.state) {
          setAuth(true)
          // console.log(location.state)
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
    verifyUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {
        auth ? (
          <div style={{
            display: "grid",
            justifyContent: "center",

          }}>
            <h1 style={{
              marginTop: "20px",
              textAlign: "center",
            }}>Select payment method</h1>
            {
              msg ? <h2 style={{
                color: "red"
              }}>{msg}</h2> : null
            }
            <div style={style.flex}>
              <div
                onClick={() => click("card")} style={{
                  borderBottom: "1px solid #808080",
                  margin: "10px",
                  padding: "20px",
                  fontSize: "20px",
                  backgroundColor: card ? '#99999910' : "#99999990",
                  cursor: "pointer",
                  textAlign: "center",
                  boxShadow: "2px 2px 5px 1px #80808060"
                }}>
                <label htmlFor="paymentMethod"> Debit/Credit Card</label>
              </div>
              <div onClick={() => click("cod")} style={{
                borderBottom: "1px solid #808080",
                margin: "10px",
                padding: "20px",
                fontSize: "20px",
                backgroundColor: cod ? '#99999910' : "#99999990",
                cursor: "pointer",
                textAlign: "center",
                boxShadow: "2px 2px 5px 1px #80808060"
              }}>
                <label htmlFor="paymentMethod"> Cash on delivery</label>
              </div>
              <div onClick={() => click("upi")} style={{
                borderBottom: "1px solid #808080",
                margin: "10px",
                padding: "20px",
                fontSize: "20px",
                backgroundColor: upi ? '#99999910' : "#99999990",
                cursor: "pointer",
                textAlign: "center",
                boxShadow: "2px 2px 5px 1px #80808060"
              }}>
                <label htmlFor="paymentMethod" > UPI</label>
              </div>
            </div>
            <Button onClick={placeOrder} margin="30px 0px" width="100%" color="#202124" textColor="#fffff0" title="Place Order" />
          </div>
        ) : <Loading />
      }
    </>

  )
}

const style = {
  flex: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    padding: "20px",
    boxSizing: "border-box",
    marginTop: "30px",
    boxShadow: "2px 2px 5px 1px #80808060"
  },
  pay: {
    borderBottom: "1px solid #808080",
    margin: "10px",
    padding: "20px",
    fontSize: "20px",
    backgroundColor: "#99999980",
    cursor: "pointer",
    textAlign: "center",
  }
}