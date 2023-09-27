import { useEffect, useState } from "react"
import "./styles/productstyle.css"
import RArrow from "../images/LArrow.png"
import LArrow from "../images/RArrow.png"
import Button from "./button"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { API } from "../App"
import Loading from "./loadingAnim"
import Message from "./message"

export default function Product() {
	axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
	axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')
	axios.defaults.headers.put['x-access-token'] = localStorage.getItem('token')

	const navigate = useNavigate()
	const [auth, setAuth] = useState(null)
	const [prod, setProd] = useState(null)
	const { id } = useParams()
	const [loading,setLoading] = useState(false)
	const [showmsg,setShowmsg] = useState(false)

	const [imgArray, setImageArray] = useState(null)

	const [count, setCount] = useState(0)

	const inc = () => {
		setCount((count + 1) % imgArray.length)
	}
	const dec = () => {
		if (count === 0) setCount(imgArray.length - 1)
		else setCount(count - 1)
	}

	const buyNow = () => {
		navigate("/buy",{
			state: {prods: [prod]}
		})
	}

	const addToCart = () => {
		setLoading(true)
		axios
			.put(`${API}/cart`, { id: prod._id })
			.then((res => {
				if(res.data.auth){
					setLoading(false)
					setShowmsg("Added to cart !")
					setTimeout(() => {
						setShowmsg(false)
					}, 2000);
				} else {
					setLoading(false)
					setShowmsg("Something went wrong...try again")
					setTimeout(() => {
						setShowmsg(false)
					}, 2000);
				}
				
			}))
	}

	useEffect(() => {
		axios
			.get(`${API}/sell/product/${id}`)
			.then(res => {
				try {
					// console.log(res.data)
					if (res.data.auth) {
						setAuth(res.data.message)
						setImageArray(res.data.imgArray.imageData)
						setProd(res.data.prod)
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			{
				auth ? (
					<div className="cont">
						<div className="container1">
							<div>
								<div className="img">
									<div onClick={dec} className="arrow"><img src={LArrow} alt="img" /></div>
									<div className="img-child"><img alt="img" className="imgg" src={imgArray[count]} /></div>
									<div onClick={inc} className="arrow"><img alt="img" src={RArrow} /></div>
								</div>
								<div style={{ textAlign: "center", width: "100%",marginBottom:"12px" }}>{count + 1}/{imgArray.length}</div>
							</div>
							{
								loading ? <Loading /> : null
							}
							{
								showmsg ? <Message message={showmsg} /> : null
							}
							<div className="attr">
								<div className="name">{prod.brand} {prod.name}</div>
								<div className="rating">Not rated</div>
								<div className="price">Rs {prod.price} &nbsp;
									{
										prod.category ? (
											<span style={{ fontSize: "18px" }}>({prod.category})</span>
										) : null
									}
								</div>
								<div className="desc">
									{prod.description}
								</div>
							</div>

							<div>
								<h1>Reviews</h1>
							</div>
							<div style={{ height: "80px" }}></div>
						</div>
						<div className="buy">
							<div className="btngrp">
								<Button
									color='#FB641B'
									margin="0px 20px"
									width='30%'
									title="Add to cart"
									onClick={addToCart}
								/>
								<Button
									color='#666fff'
									margin="0px 20px"
									width='30%'
									title="Buy now"
									onClick={buyNow}
								/>
							</div>
						</div>
					</div>
				) : (<Loading />)
			}

		</>
	)
}
