import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

function Login(){
    const [userName,setUser] = useState('');
    const [password,setPassword] = useState('');

    const handleLogin = async () => {
        try {

            await axios.post("https://localhost:7106/api/User/Login",{usr:userName,pwd:password}).then(res=>{
                if(res.data.message === 'success'){
                    localStorage.setItem('token',res.data.token)
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
 
        <div class="login-box">
        <div class="login-logo">
            <b>.NET</b><span> POS Point of Sale</span>
        </div>

        <div class="card">
            <div class="card-body login-card-body">
            <p class="login-box-msg">Sign in to start your session</p>
            <form onSubmit={handleLogin}>
                <div class="input-group mb-3">
                <input onChange={e => setUser(e.target.value)} type="email" class="form-control" placeholder="Email"/>
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                    </div>
                </div>
                </div>
                <div class="input-group mb-3">
                <input onChange={e => setPassword(e.target.value)} type="password" class="form-control" placeholder="Password"/>
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                    </div>
                </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-4 ">
                        <button onClick={handleLogin} type="submit" class="btn btn-primary btn-block">Sign In</button>
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