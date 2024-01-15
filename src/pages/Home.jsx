import { useEffect, useState } from "react";
import Template from "../components/Template";
import Config from "../config";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import Swal from "sweetalert2";

ChartJS.register(
    CategoryScale,    
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
    );

function Home() {


    const [myData,setMyData] = useState({});
    const [options,setOptions] = useState(()=>{
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });

    useEffect(()=>{fetchData()},[])

    const [yearInput,setYearInput] = useState(0);
    const [yearsList,setYearsList] = useState([]);

    const fetchData = async() => {
        let currentDate = new Date();
        let thisYear = currentDate.getFullYear();

        let yearsTemp = [];
    
        setYearInput(thisYear);
        getSaleReport(Number(thisYear));
        let defaultYear = thisYear -3
        for(let i = thisYear; thisYear >= defaultYear; thisYear--){
            let year = {value: thisYear}
            yearsTemp.push(year);
        }
        setYearsList(yearsTemp)
        console.log(thisYear,yearsTemp)

    }

    const getSaleReport = async(year) => {
        try {
            await axios.get(Config.api+"/api/Report/MonthlySaleReport/"+year,Config.headers).then(res=>{
                let arr = []
                const results = res.data

                arr = results.map(data=>data.sum)
                console.log(arr)

                const months =  [ 
                    'January', 'February', 'March', 'April' , 
                    'May', 'June', 'July', 'August' , 
                    'September',  'October', 'November', 'December' 
                ]

                setMyData({
                    labels: months ,
                    datasets: [
                        {
                            label: 'Sale',
                            data: arr,
                            backgroundColor: 'rgb(230, 130, 30, 0.6)'
                        }
                    ]
                })
            })
        } catch (error) {
            Swal.fire({
                title: 'error',
                text: error.message,

            })
        }
    }

    const handleChangeYear = (value) =>{
        setYearInput(value)
    }

    const handleDailySaleReport = (e) =>{
        e.preventDefault();
        getSaleReport(yearInput)
    }
    return (<>
            <div className="wrap">
        <Template>
                <div className="card mt-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4">
                                <div className="input-group">
                                    <span className="input-group-text">Year</span>
                                    <select className="form-control" value={yearInput} 
                                    onChange={e=>handleChangeYear(e.target.value)}
                                    >
                                        { 
                                            yearsList.map(item=> <option value={item.value}>{item.value}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="input-group">

                                </div>
                            </div>
                            <div className="col-4">
                                <div className="input-group">
                                    <button className="btn btn-primary"  onClick={handleDailySaleReport}>
                                        <i className="fa fa-check">Show item list</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="text-center mt-2">
                                <div className="h5">Annual Sale Report {yearInput}</div>
                    </div>
                    <div className="card-body">
                        {myData.datasets != null ? <Bar options={options} data={myData} height={'90%'}></Bar> : <></>}
                    </div>
                </div>
        </Template>
            </div>
    </>)
}

export default Home;