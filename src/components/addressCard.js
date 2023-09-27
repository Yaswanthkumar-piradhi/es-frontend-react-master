import add from ".././images/add.png"
import { Link, useNavigate } from "react-router-dom";
import "./style.css"
import axios from "axios";
import Button from "./button";
import { API } from "../App";
import { useEffect, useState } from "react";
import Loading from "./loadingAnim";

export default function AddressCard(props) {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
  // axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')

  const navigate = useNavigate()
  const [auth, setAuth] = useState(false)

  const selAddress = (index) => {
    console.log(props)
    navigate("/buy/payment", {
      state: {
        index,
        prods: props.prods,
        cart: props.cart
      }
    })
  }
  
  const verifyUser = () => {
    axios
      .get(`${API}/account/verify`)
      .then(res => {
        if (res.data.auth) {
          setAuth(true)
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
    // console.log(props.prods)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {
        auth ? (
          <div style={{
            width: "100vw",
            // backgroundColor: "#fff000",
            height: "fit-content",
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}>
            <div style={style.cardCont}>

              <div >
                {
                  props.addresses && props.addresses.map((address, index) => {
                    return (
                      <div key={index} style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottom: "1px solid #808080"
                      }}>
                        <div style={style.txt}>
                          <p><b>{address.fullName}</b></p>
                          <p>{address.address}</p>
                          <p>{address.city}, {address.state}, {address.zip}</p>
                          <p>{address.country}</p>
                          <p>Phone number : {address.phoneNumber}</p>
                        </div>
                        {
                          props.sel &&
                          <div>
                            <Button onClick={() => selAddress(index)} title="Select" color="#202124" width="100px" textColor="#fff" margin="0px 50px 0px 0px" />
                          </div>
                        }

                      </div>

                    )
                  })
                }
                {!props.sel &&
                  <Link className="addAddress" to="/account/addAddress">
                    <div style={style.txt1}>
                      <img style={{
                        boxShadow: "1px 1px 5px #80808080",
                        borderRadius: "25px",
                        width: "40px",
                        cursor: "pointer",
                      }} src={add} alt="Add button"
                      />
                      <div style={{
                        fontSize: "24px",
                        // backgroundColor: "#fff000",
                        marginLeft: "20px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}>Add address</div>
                    </div>
                  </Link>
                }


              </div>

            </div>
          </div>
        ) : <Loading />
      }
    </>

  )
}

const style = {
  cardCont: {
    margin: "10px",
    width: "95%",
    borderRadius: "10px",
    border: "1px solid #808080",
    boxShadow: "1px 1px 10px 1px #00000080",
    maxWidth: "800px",
  },
  txt: {
    // borderBottom: "1px solid #808080",
    padding: "20px",
    fontSize: "20px",
    display: "flex",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    flexDirection: "column",
  },
  txt1: {
    borderBottom: "1px solid #808080",
    padding: "20px",
    fontSize: "20px",
    display: "flex",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
}
