import st from "../components/style";
import "../components/style.css";
import countries from "../countries";

import axios from "axios";
import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../App";

export default function AddressForm() {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
  axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')

  const navigate = useNavigate();

  const [post, setPost] = useState({
    fullName: "",
    country: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  })

  const [message,setMessage] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
    // console.log(post)
  }

  const handleClick = (event) => {
    event.preventDefault()
    axios
      .post(`${API}/account/address`, post)
      .then((res) => {
        // console.log(res)
          if(res.data.auth){
            navigate("/account")
          } else{
            setMessage(res.data.message)
          }
      })

  }

  // useEffect(() => {
  //   // if(localStorage.getItem("token")) navigate("/cart")
  //   try {
  //     if (location.state.msg) setAuthStat(location.state.msg)
  //   } catch (error) {

  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [setAuthStat])


  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px", }}>Add a new address</h1>
      <div style={st.login1}>
        <div>
          {
            message ? (
              <div style={{ color: "red", fontSize: "20px", }}>
                {message}
              </div>
            ) : null
          }

          <div style={st.in}>
            <label style={st.labeltxt}>Country/Region</label>
            <select style={st.inp} name="country" onChange={handleChange}>
              <option selected disabled>Select Your Country</option>
              {
                countries.map(country => {
                  return <option key={country.code} value={country.name}>{country.name}</option>
                })
              }
            </select>
            <label style={st.labeltxt}>Full name</label>
            <input style={st.inp}
              value={post.fullName}
              name="fullName"
              placeholder="Enter full name"
              onChange={handleChange}
              type="text"
            />
            <label style={st.labeltxt}>Phone number</label>
            <input style={st.inp}
              value={post.phoneNumber}
              name="phoneNumber"
              placeholder="Enter your phone number"
              onChange={handleChange}
              type="number"
            />
            <label style={st.labeltxt}>Address</label>
            <textarea style={{
              height: "80px",
              padding: " 5px 10px",
              width: "100%",
              fontSize: "20px",
              borderRadius: "5px",
              marginBottom: "20px",
              // border:"none",
              border: "1px solid #999999"
            }}
              value={post.address}
              name="address"
              placeholder="Enter your address"
              onChange={handleChange}
              type="text"
            />
            <label style={st.labeltxt}>City</label>
            <input style={st.inp}
              value={post.city}
              name="city"
              placeholder="Enter your city"
              onChange={handleChange}
              type="text"
            />
            <label style={st.labeltxt}>State</label>
            <input style={st.inp}
              value={post.state}
              name="state"
              placeholder="Enter your state"
              onChange={handleChange}
              type="text"
            />
            <label style={st.labeltxt}>ZIP Code</label>
            <input style={st.inp}
              value={post.zip}
              name="zip"
              placeholder="Enter your zip code"
              onChange={handleChange}
              type="number"
            />
            <button className="btn" onClick={handleClick} style={st.btn}>Add address</button>
          </div>
        </div>

      </div>
    </div>

  )
}