import "./components/homeStyle.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./components/loadingAnim";
import ProdCardB from "./components/productCard/productCardB";

export const API = process.env.REACT_APP_API;


function App() {


  const [feat, setFeat] = useState(null)
  const [elec, setElect] = useState(null)
  const [clothes, setClothes] = useState(null)
  const [rand, setRand] = useState(null)

  useEffect(() => {
    getFeature()
    getElectronics()
    getClothes()
    getRandom()
  }, [])

  const getFeature = () => {
    axios
      .get(`${API}/featProd`)
      .then(res => {
        // console.log(res.data.featProd[0],res.data.imgData.imageData)
        setFeat(res.data.featProd[0])
      })
  }

  const getElectronics = () => {
    axios
      .get(`${API}/electronicProds`)
      .then((res) => {
        setElect(res.data.prods)
      })
    setClothes(null)
    setRand(null)
  }

  const getClothes = () => {

  }

  const getRandom = () => {

  }

  return (

    <div className="Home">
      <div className="feat">
        {
          feat  ? (
            <div style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1fr"
            }}>
              <h2>Featuring Product</h2>
              <div style={{
                display:"grid",
                // backgroundColor:"#fff",
                // gridAutoColumns:"",
                alignItems:"center",
                justifyContent:"center",
                width:"90vw"
                
              }}>
                <ProdCardB
                  key={feat._id}
                  id={feat._id}
                  name={feat.name}
                  currency={feat.currency}
                  price={feat.price}
                // small="true"
                />
              </div>

            </div>
          ) : (
            <>
              <Loading />
            </>
          )
        }
      </div>
      <div className="elec">
        <h2 style={{marginBottom:"5px",marginTop:"5px",}}>Electronics Section</h2>
        {
          elec  ? (
            <div style={{
              overflowX: "scroll",
              overflowY: "hidden",
              whiteSpace: "nowrap",
              position: "relative",
              width: "100%"
              // float:"right"
            }}>
              {
                elec.map(prod => {
                  return (
                    <ProdCardB
                      key={prod._id}
                      id={prod._id}
                      name={prod.name}
                      currency={prod.currency}
                      price={prod.price}
                      small="true"
                    />
                  )
                })
              }
            </div>
          ) : (
            <>
              <Loading />
            </>
          )
        }
      </div>
      <div className="clothes">
        {
          clothes ? (
            <div style={{
              position: "relative"
            }}>Clothes section</div>
          ) : (
            <>
              <Loading />
            </>
          )
        }
      </div>
      <div className="toys">
        {
          rand ? (
            <div style={{
              position: "relative"
            }}>Others section</div>
          ) : (
            <>
              <Loading />
            </>
          )
        }
      </div>
    </div>
  );
}

export default App;

