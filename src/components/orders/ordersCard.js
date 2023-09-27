import ProdCardB from "../productCard/productCardB"
import showDetails from "../../images/showDetails.png"
import { useState } from "react"

export default function OrdersCard(props) {

  const d = new Date(props.order.orderDate)
  const [toggle, setToggle] = useState(false)

  return (
    <div style={{
      position: "relative",
      padding: "10px",
      boxSizing: "border-box",
      overflowY: "hidden",
    }}>
      <div style={{
        position: "absolute",
        transform: "translate(-50px,28px)",
        display: "grid",
        alignItems: "start",
        justifyContent: "end",
        width: "100%",
        height: toggle ? "fit-content" : "0px",
        zIndex: "5",
        transition: "all 0.1s ease-in",
        // backgroundColor:"#123123",
        overflow: "hidden",
      }}>
        <div style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-arround",
          backgroundColor: "#fff",
          border: "1px solid #00000060",
          padding: "10px",
          boxShadow: "-1px 1px 10px 1px #00000040",
          flexDirection: "column",
          gap: "10px",
          transition: "all 0.1s ease-in",
          opacity: toggle ? 1 : 0,
          // transform: toggle ? "translateX(-0px)" : "translateX(100px)"
        }}>
          <div>
            Status : {props.order.status}
          </div>
          {
            props.order.stat1 ?
              <div>
                Expected delivery : {props.order.stat1}
              </div> : null
          }
          {
            props.order.stat2 ?
              <div>
                {props.order.stat2}
                {/* not yet shipped */}
              </div> : null
          }
          <div>Method of payment : {props.order.method}</div>
        </div>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "row"
      }}>
        <span style={{
          fontSize: "18px",
          fontWeight: "500",
          flex: "1"
        }}>Ordered on {[(d.getDate()), (d.getMonth() + 1), d.getFullYear()].join('/')} at {d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
        </span>
        <div style={{
          padding: "2px 10px",
          cursor: "pointer",
          overflow: "hidden",
        }} onClick={() => setToggle(!toggle)}>
          <img style={{
            transform: toggle ? null : "rotate(180deg)",
            transition: "all 0.2s"
          }} width="30" height="20" src={showDetails} alt="showStatus" />
        </div>
      </div>
      <div style={{
        position: "relative",
        overflowX: "auto",
        whiteSpace: "nowrap",
        textAlign: "center"
      }}>
        {
          props.order.productIds.map(prod => {
            return (
              <div style={{
                display: "inline",
              }} key={prod._id}>
                <ProdCardB small={true}
                  id={prod._id}
                  name={prod.name}
                  brand={prod.brand}
                />
              </div>
            )

          })
        }

      </div>

    </div>
  )
}