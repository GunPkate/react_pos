import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Template from "../components/Template";

function UserProfile(){
    return (<>
            <Template>
                <div className="h5 pt-4">Profile</div>
                <div className="card">
                    <div className="card-body">
                        <div>Name</div>
                        <input className="form-control" type="text"/>
                    </div>
                    <div className="card-body">
                        <div>User</div>
                        <input className="form-control" type="text"/>
                    </div>
                    <div className="card-body">
                        <div>Password</div>
                        <input className="form-control" type="text"/>
                    </div>
                </div>
            </Template>
    </>)
}

export default UserProfile;