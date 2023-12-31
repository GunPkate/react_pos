import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar(){
    const navigate = useNavigate();
    const logout = () => {
        Swal.fire({
            title:'Log out',
            text: 'Confirm Log Out',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes'
        }).then(res => {
            if(res.isConfirmed)
            localStorage.removeItem('token');
            navigate('/')
        })
    }
    return (
    <>
          <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
            </ul>


            <ul className="navbar-nav ml-auto">

            <li className="nav-item">

                <button onClick={logout} className="btn-danger">
                    Log Out
                    &nbsp;
                    <i className="fa fa-arrow-right"></i>
                </button>
            </li>
             
            </ul>
        </nav>    
    </>
    )
} 

export default Navbar;