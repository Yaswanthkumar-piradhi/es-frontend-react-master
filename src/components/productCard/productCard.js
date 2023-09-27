import "../../components/seller/styles/prods.css"
import { Link } from "react-router-dom"
import Loading from "../loadingAnim"

const ProdCard = (props) => {
  return (
    <div style={{
      display: props.small ? "inline-block" : "",
      maxWidth: props.small ? "320px" : "",
      backgroundColor: "#ffffff",
      // boxShadow:"3px 3px 10px 1px #00000080",
    }} className="prod-card">
      <div className="prod-img">
      {
        props.src ? (
          <Link to={"../product/" + props.id} className="prod-name">
          <img height={200} width={200} className="prod-img" src={props.src} alt="Product Imge" />
        </Link>
        ) : (
          <Loading />
        )
      }
        
      </div>
      <Link to={"../product/" + props.id} className="prod-name">
        <div>{props.name}</div>
        <div>Rs {props.price}</div>
      </Link>
    </div>
  )
}

export default ProdCard;