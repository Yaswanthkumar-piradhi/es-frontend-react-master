import st from "./style";
import "./style.css";
import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { API } from "../App";

export default function Login() {
    axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
    const location = useLocation();
    const navigate = useNavigate();

    const [post, setPost] = useState({
        number: "",
        password: "",
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
            .post(`${API}/login`, post)
            .then((res) => {
                if (res.data.auth) {
                    localStorage.setItem('token', res.data.token)
                    navigate("/")
                    // console.log(localStorage.getItem('token'))
                } else {
                    setAuthStat(res.data)
                }
            })

    }

    useEffect(()=>{
        if(localStorage.getItem("token")) navigate("/cart")
        try {
            if(location.state.msg) setAuthStat(location.state.msg)
        } catch (error) {
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[setAuthStat])


    return (
        <div>
            <h1 style={{ textAlign: "center",margin:"20px", }}>Sign in</h1>
            <div style={st.login}>
                <div style={st.form}>
                    {
                        authStat ? (
                            <div style={{ color: "red", fontSize: "20px",transform:"translateY(-10px)" }}>
                                {authStat}
                            </div>
                        ) : null
                    }

                    <div style={st.in}>
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
                        <button className="btn" onClick={handleClick} style={st.btn}>Sign in</button>
                    </div>
                    <h3>New to our site?</h3>
                    <button className="btn" onClick={()=>navigate("/signup")} style={st.btn1}>Sign up</button>
                    <div></div>
                </div>
                    
            </div>
        </div>

    )
}