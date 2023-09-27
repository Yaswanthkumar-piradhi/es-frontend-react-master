import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { API } from "../../App";
import Loading from "../loadingAnim";
import "./styles/style.css";
import Button from "../button";
import Compressor from "compressorjs";



function Sell() {
	axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
	axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')

	const navigate = useNavigate()
	const [auth, setAuth] = useState(null)
	const categories = [
		"electronics",
		"clothes",
		"toys",
	]

	const [uploadStat, setUploadStat] = useState(false)
	const [message, setMessage] = useState(null)
	const [showLoading, setShowLoading] = useState(false)

	useEffect(() => {
		axios
			.get(`${API}/sell/upload`)
			.then((res) => {
				try {
					console.log(res.data)
					if (res.data.auth) {
						setAuth(res.data.message)
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
				}


			})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth])

	const [post, setPost] = useState({
		name: "",
		brand: "",
		price: "",
		currency: "",
		description: "",
		category: "",
		subcategory:"",
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setPost((prev) => {
			return {
				...prev,
				[name]: value
			}
		})

	}

	// const [files, setFiles] = useState([])
	const [results, setResults] = useState([])
	const [files, setFiles] = useState([])
	const [fail, setFail] = useState(null)

	const compressFiles = async (e) => {
		var compFiles = []
		for (let i = 0; i < e.target.files.length; i++) {
			const image = await e.target.files[i];
			new Compressor(image, {
				quality: 0.8,
				success: (compressedResult) => {
					compFiles.push(compressedResult)
					// console.log("Pushed")
					setFiles(compFiles)
				},
			});
		}
	}

	const handleF = (e) => {
		// setShowLoading(true)
		var temp = []
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				const reader = new FileReader()
				reader.onloadend = async () => {
					const res = await reader.result.toString()
					temp.push(res)
					setResults(temp)
				}
				reader.readAsDataURL(files[i])
			}
			setUploadStat(true)
			setMessage(null)
		} else {
			setMessage("Upload images")
		}
	}





	const handleFiles = async (e) => {

		await compressFiles(e)

	}

	const handleUpload = async (e) => {
		// console.log(post,results)
		if (uploadStat === true) {
			setShowLoading(true)
			axios
				.post(`${API}/sell/upload`, { post, results })
				.then(res => {
					console.log(res.data)
					if (res.data.auth) {
						navigate("/products")
					} else {
						setFail("Fill all fields")
					}
					setShowLoading(false)
					// console.log(results)
				})
		} else {
			setMessage("Upload Images")
		}

	}

	return (
		<div>
			{
				auth ? (
					<div className="contain">
						<h1 style={{ margin: "20px" }}>{auth}</h1>
						{
							fail ? <h2 style={{ marginLeft: "20px", color: "red", marginBottom: "10px", }}>{fail}</h2> : null
						}
						<div style={{
							position: "absolute",
							backgroundColor: "#00000070",
							width: "100%",
							height: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							visibility: showLoading ? "visible" : "hidden",
						}}>
							<Loading />
						</div>
						<div className="form">
							<label className="label">Select Brand</label>
							<input
								placeholder="Enter brand name"
								className="inp"
								type="text"
								name="brand"
								onChange={handleChange}
								value={post.brand}
							/>
							<label className="label">Product name</label>
							<input
								placeholder="Enter product name"
								className="inp"
								type="text"
								name="name"
								onChange={handleChange}
								value={post.name}
							/>
							<label className="label">Price</label>
							<input
								placeholder="Product Price"
								className="inp"
								type="number"
								name="price"
								onChange={handleChange}
								value={post.price}
							/>
							<label className="label">Category</label>
							<select
								className="inp"
								onChange={handleChange}
								name="category"
							>
								<option selected disabled>Select a category</option>
								{
									categories.map((category) => {
										return (
											<option key={category} value={category} >{category}</option>
										)
									})
								}
							</select>
							<label className="label">Sub category</label>
							<input
								placeholder="Enter a sub category"
								className="inp"
								type="text"
								name="subcategory"
								onChange={handleChange}
								value={post.subcategory}
							/>
							<label className="label">Description</label>
							<textarea
								placeholder="Product description"
								className="inp1"
								type="text"
								name="description"
								onChange={handleChange}
								value={post.description}
							/>
							{
								message ? <h2 style={{ marginLeft: "20px", color: "red" }}>{message}</h2> : null
							}
							<label className="label">Select images</label>
							<input
								className="inp"
								type="file"
								name="files"
								onChange={e => handleFiles(e)}
								multiple
							/>
							<Button onClick={handleF} color='grey' margin="20px 0px" width='100%' title="Upload Images" />

						</div>
						<Button onClick={handleUpload} color='#666fff' margin="20px 0px" width='100%' title="Upload Product" />
						<Button onClick={() => navigate("/products")} color='#FB641B' width='100%' title="Cancel" />
						{/* <img src={results[0]} alt="dfb" /> */}
					</div>

				) : <Loading />
			}

		</div>
	)
}


export default Sell