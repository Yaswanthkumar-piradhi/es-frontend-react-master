import { useState, useEffect } from "react"
import axios from "axios"
import st from "../style";
import { useNavigate } from "react-router-dom"
import { API } from "../../App";
import Loading from "../loadingAnim";
import ProdCardB from "../productCard/productCardB";
import "../seller/styles/prods.css"
import deleteButton from "../images/cross-button.png"
import Button from "../button";



function Cart() {
	axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
	axios.defaults.headers.delete['x-access-token'] = localStorage.getItem('token')


	const navigate = useNavigate()
	const [cart, setCart] = useState(null)
	const [prods, setProds] = useState(null)
	useEffect(() => {
		if (prods) {
			// console.log(prods)
		} else {
			getProducts()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cart])

	const getProducts = () => {
		axios
			.get(`${API}/cart`)
			.then(async (res) => {
				try {
					if (res.data.auth) {
						if (res.data.prods.productIds.length !== 0) {
							setCart(res.data.message)
							const ps = res.data.prods.productIds
							setProds(ps)
						}
						else {
							setProds(null)
							setCart("empty")
						}
					}
					else {
						localStorage.removeItem('token')
						navigate("/login", {
							state: {
								msg: "Login to continue"
							}
						})
					}
				} catch (error) {
					setProds(false)
					setCart("Empty cart")
				}
			})
			.catch(err => {
				setProds(false)
				setCart("Empty Cart")
			})
	}


	const handleDelete = (id) => {
		axios
			.delete(`${API}/cart/removeProduct/${id}`)
			.then(res => {
				if (res.data.auth) {
					getProducts()
				} else {
				}
			})
	}

	const buyNow = () => {
		// console.log(prods)
		navigate("/buy", {
			state: {
				prods,
				cart: true,
			}
		})
	}

	return (
		<div style={st.App}>
			{
				cart ? (
					<div>
						{
							prods ? <span>Your Cart</span> : <span>Empty Cart</span>
						}
						<div className="Prods-cont">
							{
								prods ?
									prods.map(prod => {
										return (

											<div style={style.cardContainer} key={prod._id}>
												<div>
													{
														<ProdCardB
															id={prod._id}
															name={prod.name}
															currency={prod.currency}
															price={prod.price}
														// small="true"
														/>
													}
													<div style={{
														position: "absolute",
														zIndex: "5",
														transform: "translateY(-280px)",
														margin: "10px",
														cursor: "pointer",
													}}
														onClick={() => handleDelete(prod._id)}
													>
														<img width="30" src={deleteButton} alt="Delete" />
													</div>
												</div>
											</div>
										)
									}) : null
							}
						</div>
						{
							prods ? (
								<div style={{
									position: "fixed",
									margin: "auto",
									bottom: "0",
									display: "grid",
									justifyContent: 'center',
									width: "100%"
								}}>
									<Button
										textColor="#fffff0"
										color="#555666"
										width="200px"
										margin="10px 0px"
										title="Buy now"
										onClick={buyNow}
									/>
								</div>
							) : null
						}
					</div>
				) : <Loading />
			}

		</div>
	)
}

export default Cart

const style = {
	cardContainer: {
		position: "relative"
	},
	cardOptions: {
		position: "absolute",
		zIndex: "5",
		transform: "translateY(-50px)"
	}
}