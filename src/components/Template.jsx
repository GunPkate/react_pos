import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Template(props) {
    return (<>
        <div className="wrapper">
            <Navbar/>
            <Sidebar/>
            <div className="content-wrapper">
                <section className="content">
                    {props.children}
                </section>
            </div>
        </div>
    </>)
}

export default Template;