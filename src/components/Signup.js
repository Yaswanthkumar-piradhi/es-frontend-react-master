import st from "./style";
import "./style.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../App";

export default function Login() {

    const navigate = useNavigate();

    const [post, setPost] = useState({
        number: "",
        password: "",
        name:"",
    })

    const [authStat, setAuthStat] = useState(null)

    const handleChange = (event) => {
        const { name, value } = event.target
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })

    }

    const handleClick = (event) => {
        event.preventDefault()
        axios
            .post(`${API}/login/signup`, post)
            .then((res) => {
                if(res.data.status) {
                    navigate("/login",{
                        state:{
                            msg:"Login to continue",
                        }
                    })
                } else {
                    setAuthStat(res.data.error)
                }
            })

    }


    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Sign in</h1>
            <div style={st.login}>
                <div style={st.form1}>
                    {
                        authStat ? (
                            <div style={{ color: "red", fontSize: "24px" }}>
                                {authStat}
                            </div>
                        ) : null
                    }

                    <div style={st.in}>
                    <input style={st.inp}
                            value={post.name}
                            name="name"
                            placeholder="Enter name"
                            onChange={handleChange}
                            type="text"
                        />
                        <input style={st.inp}
                            value={post.number}
                            name="number"
                            placeholder="Enter number"
                            onChange={handleChange}
                            type="number"
                        />
                        <input
                            style={st.inp}
                            value={post.password}
                            placeholder="Enter password"
                            onChange={handleChange}
                            type="password"
                            name="password"
                        />
                        <button className="btn" onClick={handleClick} style={st.btn}>Sign up</button>
                    </div>
                    <h3>Already a customer?</h3>
                    <button className="btn" onClick={()=>navigate('/login')} style={st.btn1}>Sign in</button>
                    <div></div>
                </div>
                    
            </div>
        </div>

    )
}