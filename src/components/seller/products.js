import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { API } from "../../App"
import axios from "axios"
import Loading from "../loadingAnim"
import "./styles/prods.css"
import Button from "../button"
import ProdCardB from "../productCard/productCardB"
import deleteButton from '../../components/images/cross-button.png'

export default function Products() {
	axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
	axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')
	axios.defaults.headers.delete['x-access-token'] = localStorage.getItem('token')


	const navigate = useNavigate()

	const [auth, setAuth] = useState(null)
	const [prods, setProds] = useState([])

	useEffect(() => {
		getProducts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth])

	const getProducts = () => {
		axios
			.get(`${API}/sell/products`)
			.then((res) => {
				try {
					// console.log(res.data)
					if (res.data.auth) {
						setAuth(res.data.message)
						setProds(res.data.prods)
						// console.log(images)
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
					setAuth("error")
					console.log(error)
				}
			})
	}

	const handleDelete = (id) => {
		axios
			.delete(`${API}/sell/product/delete/${id}`)
			.then(res => {
				console.log(res.data)
				if (res.data.auth) {
					getProducts()
				} else {
					alert("Error occured try again")
				}
			})

	}

	return (
		<div className="prod-home"><h1>{auth}</h1>
			{
				auth ? (
					<>
						<Button title="Upload a product" color="#666fff" onClick={() => navigate("/sell")} />
						<div className="Prods-cont">
							{
								prods.map(prod => {
									return (
										<div style={style.cardContainer} key={prod._id}>
											<ProdCardB
												id={prod._id}
												name={prod.name}
												currency={prod.currency}
												price={prod.price}
											// small="true"
											/>
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
									)
								})
							}
						</div>
					</>
				) : (<Loading />)
			}
		</div>
	)
}

const style = {
	cardContainer: {
		position: "relative",
		zIndex: "5"
	},
	cardOptions: {
		position: "absolute",
		zIndex: "5",
		transform: "translateY(-50px)"
	}
}