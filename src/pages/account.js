import AccountCard from "../components/accountCard";
import Loading from "../components/loadingAnim";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../App"
import { useNavigate } from "react-router-dom";
import AddressCard from "../components/addressCard";

const Account = () => {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')

  const [auth, setAuth] = useState(false)
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const getUserData = () => {
    axios
      .get(`${API}/account`)
      .then(res => {
        if (res.data.auth) {
          setUserData(res.data.result)
          setAuth(true)
        } else {
          navigate("/login", {
            state: {
              msg: "Login to continue "
            }
          })
        }
      })
  }

  useEffect(() => {
    getUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{
      display:"grid",
      // backgroundColor:"#fff000",
      justifyContent:"center",
      alignItems:"center",
      width:"100vw"

    }}>
      <h1 style={{
        textAlign: "center",
      }}>Your account</h1>
      {
        auth ?
          <>
            <AccountCard name={userData.name} phone={userData.phone} />
            <h2 style={{
              textAlign: "center",
              borderTop: "1px solid #808080",
              padding: "5px"
            }}>Your Addresses</h2>
            <AddressCard ids={userData}  addresses={userData.addresses}/>
          </>
          :
          <Loading />
      }
    </div>
  )
}

export default Account;