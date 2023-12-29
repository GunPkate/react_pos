function Login(){
    return (
    <>
 
        <div class="login-box">
        <div class="login-logo">
            <b>.NET</b><span> POS Point of Sale</span>
        </div>

        <div class="card">
            <div class="card-body login-card-body">
            <p class="login-box-msg">Sign in to start your session</p>
            <form>
                <div class="input-group mb-3">
                <input type="email" class="form-control" placeholder="Email"/>
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                    </div>
                </div>
                </div>
                <div class="input-group mb-3">
                <input type="password" class="form-control" placeholder="Password"/>
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                    </div>
                </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-4 ">
                        <button type="submit" class="btn btn-primary btn-block">Sign In</button>
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