import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Config from "../config";

function Login(){
    const [userName,setUser] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(Config.api+"/api/User/Login",{usr:userName,pwd:password}).then(res=>{
            if(res.data.message === 'Token Success'){
                    localStorage.setItem('token',res.data.token)
                    navigate('/home');
                }
            }).catch(err =>{
                throw err.response.data;
            })
        }
        catch (e) {
            Swal.fire({
                title: 'error',
                message: e.message,
                icon: 'error'
            })
        }
    }
    return (
    <>
 
        <div className="login-box">
        <div className="login-logo">
            <b>.NET</b><span> POS Point of Sale</span>
        </div>

        <div className="card">
            <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={handleLogin}>
                <div className="input-group mb-3">
                <input onChange={e => setUser(e.target.value)} type="email" className="form-control" placeholder="Email"/>
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                    </div>
                </div>
                </div>
                <div className="input-group mb-3">
                <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password"/>
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                    </div>
                </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-4 ">
                        <button onClick={handleLogin} type="submit" className="btn btn-primary btn-block">Sign In</button>
                    </div>

                </div>
            </form>
            </div>
        </div>
        </div>
    </>
    )
}

export default Login;