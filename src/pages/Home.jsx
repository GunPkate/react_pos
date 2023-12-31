import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Home() {
    return (<>
        <div className="wrapper">
            <Navbar/>
            <Sidebar/>
        </div>
    </>)
}

export default Home;