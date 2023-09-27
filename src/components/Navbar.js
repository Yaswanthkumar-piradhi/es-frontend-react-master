import { useNavigate, Link } from "react-router-dom"
import "./style.css"
import st from "./style"
import { useState } from "react"
import logo from "./nav-logo.png"
import searchIcon from '../images/search.png'
import cross from '../images/cross.png'

function Navb() {
	const navigate = useNavigate()
	const [showModal, setShowModal] = useState(false)
	const [search, setSearch] = useState("")

	const modalHandle = () => {
		setShowModal(!showModal)
	}


const handleSearch = (event) => {
	if (event.key === 'Enter' && search !== "" && search != null){
		searchProds()
	}
}

const searchProds = () => {
	navigate(`search/${search}`)
}

	return (
		<div style={st.cont}>
			<div style={st.navbar}>
				<div className="nav" onClick={() => { navigate("/"); setShowModal(false) }} style={st.nav}>
					WebName
				</div>
				<div className="nav" onClick={() => { setShowModal(false) }} style={{
					backgroundColor: "#202124",
					color: "#fff",
					padding: "12px",
					display: "flex",
					overflow: "hidden",
					margin: "10px 0px"
				}}>
					<img style={{ marginRight: "3px", filter: "invert(1)" }} width={30} src={searchIcon} alt='search' />
					<div style={{
						flex: 1,
						display: "flex",
						border: "1px solid grey",
						borderRadius: "10px",
						justifyContent: "center",
						alignItems: "center",
					}}>
						<input
							style={{
								height: "30px",
								backgroundColor: "#00000000",
								color: "#fff",
								fontSize: "16px",
								flex: 1,
								paddingLeft: "10px",
								border: "none",
								outline: "none"
							}}
							onKeyDown={handleSearch}
							placeholder="Search products"
							type="text"
							onChange={(event) => { setSearch(event.target.value) }}
							value={search}
						/>
						{
							search &&
							<div onClick={() => { setSearch(""); }} >
								<img style={{ filter: "invert(1)", marginRight: "3px", cursor: "pointer", }} width={20} height={20} src={cross} alt='search' />
							</div>
						}
					</div>
				</div>
				<div className="nav" onClick={modalHandle} style={{
					backgroundColor: "#202124",
					color: "#fff",
					display: "flex",
					justifyContent: "flex-end",
					// padding: "10px 10px 0 0",
					paddingRight: "10px"
				}}>
					<div style={{
						display: "flex",
						cursor: "pointer",
					}}>
						<img width={40} height={40} src={logo} alt="nav" />
					</div>
				</div>
			</div>
			{
				showModal ? (
					<div visible='false' style={style.modal}>
						<ul className="navbar">
							<Link onClick={() => { setShowModal(false) }} to="/" className="nav-link">Home</Link>
							<Link onClick={() => { setShowModal(false) }} to="/orders" className="nav-link">Orders</Link>
							<Link onClick={() => { setShowModal(false) }} to="/cart" className="nav-link">Cart</Link>
							<Link onClick={() => { setShowModal(false) }} to="/products" className="nav-link">Your Products</Link>
							<Link onClick={() => { setShowModal(false) }} to="/account" className="nav-link">Account</Link>
							{
								localStorage.getItem('token') ? (
									<li onClick={() => { setShowModal(false); localStorage.removeItem('token'); navigate("/") }} className="nav-link">Logout</li>
								) : (
									<li onClick={() => { setShowModal(false); navigate("/login"); }} className="nav-link">Login</li>
								)
							}
						</ul>
					</div>
				) : (null)
			}
		</div>
	);
}

export default Navb;


const style = {
	modal: {
		margin: "60px 0px 0px 0px",
		width: "100vw",
		height: "100vh",
		display: "grid",
		position: "fixed",
		backgroundColor: "#00000099",
		color: "white",
		backdropFilter: "blur(10px)",
		alignItems: "",
		textAlign: "right",
		zIndex: "10",
	}
}