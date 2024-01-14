import axios from "axios";
import { useState,useEffect } from "react";
import Swal from "sweetalert2";
import Config from "../config";
import { Link } from "react-router-dom";

function Sidebar(){

    const [userName,setUserName] = useState('');
    const [level,setLevel] = useState('');
    useEffect(()=>{ fetchData() },[])
    
    const fetchData = async () =>{
        try {
            
            await axios.post(Config.api+"/api/User/GetInfo",null,Config.headers).then(res=>{
                    setLevel(res.data.level);
                    setUserName(res.data.name)
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
    return(<>
          <aside className="main-sidebar sidebar-dark-primary elevation-4">

    <a href="index3.html" className="brand-link">
      <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}}/>
      <span className="brand-text font-weight-light">POS</span>
    </a>


    <div className="sidebar">

      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image"/>
        </div>
        <div className="info">
          <a href="#" className="d-block">{userName} : {level} </a>
        </div>
      </div>


      <div className="form-inline">
        <div className="input-group" data-widget="sidebar-search">
          <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"/>
          <div className="input-group-append">
            <button className="btn btn-sidebar">
              <i className="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>


      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">


          <li className="nav-header">Menu</li>
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              <i className="nav-icon fa fa-home"></i>
              <p>
                Dashboard
              </p>
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/billreport" className="nav-link">
              <i className="nav-icon fa fa-list-alt"></i>
              <p>
                Bill Report
              </p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/dailysalereport" className="nav-link">
              <i className="nav-icon fa fa-list"></i>
              <p>
                Daily Sale Report
              </p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/home" className="nav-link">
              <i className="nav-icon fa fa-file-alt"></i>
              <p>
                Monthly Sale Report
              </p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/product" className="nav-link">
              <i className="nav-icon fa fa-box"></i>
              <p>
                Product
              </p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sale" className="nav-link">
              <i className="nav-icon fa fa-dollar"></i>
              <p>
                Sale
              </p>
            </Link>
          </li>
         
        </ul>
      </nav>

    </div>

  </aside>
        
    </>)
}

export default Sidebar;