import Template from "../components/Template";
import { useState,useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Config from "../config";

function UserProfile(){
    const[name,setName] = useState('');
    const[usr,setUsr] = useState('');
    const[pwd,setPwd] = useState('');

    useEffect(()=>{ fetchData() },[])

    const fetchData = async () =>{
        try {
            
            await axios.post(Config.api+"/api/User/GetInfo",null,Config.headers).then(res=>{
                console.log(res)
                if(res.data)
                    setName(res.data.name);
                    setUsr(res.data.usr);
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

    const handleSave = async (e) =>{
        e.preventDefault();
        try {
            const params = {
                name: name,
                usr: usr,
                pwd: pwd
            }
            await axios.post(Config.api+'/api/User/ChangeProfileSave',params,Config.headers).then(res => {
                if(res){
                    Swal.fire({
                        title: 'Save New User',
                        icon: 'success',
                        timer: 1500
                    })
                }
            })
        } catch (error) {
            Swal.fire({
                title: 'error',
                text: e.message,
                icon: 'error'
            })
        }
    }
    return (<>
            <Template>
                <div className="h5 pt-4">Profile</div>
                <div className="card">
                    <div className="card-body">
                        <div>Name</div>
                        <input value={name} onChange={e => setName(e.target.value)} className="form-control" type="text"/>

                        <div>User</div>
                        <input value={usr} onChange={e => setUsr(e.target.value)}  className="form-control" type="text"/>

                        <div>Password</div>
                        <input onChange={e => setPwd(e.target.value)}  className="form-control" type="password"/>
                    
                        <button onClick={handleSave} className="btn-primary nt-3">
                            Save
                        </button>
                    </div>
                </div>
            </Template>
    </>)
}

export default UserProfile;