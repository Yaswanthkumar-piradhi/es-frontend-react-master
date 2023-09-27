import "../../components/seller/styles/prods.css"
import { Link } from "react-router-dom"
import Loading from "../loadingAnim"
import { API } from "../../App"
import { useState,useEffect } from "react"
import axios from "axios"

const ProdCardB = (props) => {

  const [image,setImage] = useState(null)

  useEffect(()=>{
    const getImage = (id) => {
      axios
        .get(`${API}/account/orders/image/${id}`)
        .then(res => {
          // console.log(res.data)
          setImage(res.data)
        })
    }
    getImage(props.id)
		// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div style={{
      display: props.small ? "inline-block" : "",
      maxWidth: props.small ? "222px" : "",
      backgroundColor: "#ffffff",
    }} className="prod-card">
      <div className="prod-img">
      {
        image ? (
          <Link to={"../product/" + props.id} className="prod-name">
          <img height={200} width={200} className="prod-img" src={image} alt="Product Imge" />
        </Link>
        ) : (
          <Loading />
        )
      }
        
      </div>
      <Link to={"../product/" + props.id} className="prod-name">
        <div style={{
          overflow:"hidden",
          textOverflow:"ellipsis",
        }}>{props.brand} {props.name}</div>
        <div>Rs {props.price}</div>
      </Link>
    </div>
  )
}

export default ProdCardB;