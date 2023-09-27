import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../App";
import ProdCardB from "../components/productCard/productCardB";
import Loading from "../components/loadingAnim";
import { useParams } from "react-router-dom";

const Search = () => {
  const { product } = useParams()
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    searchProds(product)
  }, [product])

  const searchProds = (product) => {
    setResult(null)
    setMessage(null)
    axios
      .get(`${API}/search/${product}`)
      .then(res => {
        // console.log(res.data)
        if (res.data.length > 0) {
          setResult(res.data)
          // console.log(res.data)
        } else {
          setResult(null)
          setMessage("No products found")
        }
      })
      .catch(error => {
        setResult(null)
        // console.log(error)
      })
  }

  return (
    <div>
      <div>
        {
          result ?
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(430px,1fr))"
              }}>
              {
                result.map(prod => {
                  return (
                    <ProdCardB
                      key={prod._id}
                      id={prod._id}
                      name={prod.name}
                      price={prod.price}
                    />
                  )
                })
              }
            </div>
            :
            message ?
              <h2 style={{ color: "#f00f0a",fontSize:"1.8rem", textAlign: "center", }}>{message}</h2>
              :
              <Loading />
        }
      </div>
    </div>
  )
}

export default Search;