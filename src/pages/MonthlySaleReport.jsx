import { useEffect, useState } from "react"
import Template from "../components/Template"
import axios from "axios"
import Config from "../config"
import Swal from "sweetalert2"

export default function MonthlySaleReport(){

    const [dailySale,setDailySale] = useState([])
    const [yearInput,setYearInput] = useState()
    const [yearList,setYearsList] = useState([])
    
    useEffect(()=>{DefaultData()},[]);

    const months =  [ 
        'January', 'February', 'March', 'April' , 
        'May', 'June', 'July', 'August' , 
        'September',  'October', 'November', 'December' 
    ]
    
    let yearsTemp = []
    const DefaultData = async() =>{
        let currentDate = new Date();
        let thisYear = currentDate.getFullYear();

        setYearInput(thisYear);
        getDailySale(Number(thisYear));
        let defaultYear = thisYear -3
        for(let i = thisYear; thisYear >= defaultYear; thisYear--){
            let year = {value: thisYear}
            yearsTemp.push(year);
        }
        setYearsList(yearsTemp)


    }

    const getDailySale = async (y) =>{
        try {
            
            await axios.get(Config.api+"/api/Report/MonthlySaleReport/"+y,null,Config.headers).then(res=>{

                let data = []
                res.data.filter(data=>data.sum).length > 0 ? data = res.data : data = res.data.filter(data=>data.sum)

                console.log(JSON.stringify(data))
                setDailySale(data)
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

    const handleChangeYear = (data) => {
        setYearInput(data)
        // console.log(data)
    }

    const handleDailySaleReport = (e) =>{
        e.preventDefault();
        getDailySale(yearInput)
        console.log(yearInput)
    }

    return (
        <>
            <Template>
                <div className="card mt-3">
                    <div className="card-body">
                        <div className="h5">
                            Bill Report
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div className="input-group">
                                    <span className="input-group-text">Year</span>
                                    <select className="form-control" value={yearInput} 
                                    onChange={e=>handleChangeYear(e.target.value)}
                                    >
                                        { 
                                            yearList.map(item=> <option value={item.value}>{item.value}</option>)
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
                <table className="table table-bordered table-stiped mt-2">
                    <thead>
                        <tr>
                            <th className="col-1">Month</th>
                            <th className="col-6">Total Cash</th>

                        </tr>
                    </thead>
                    <tbody>{
                        dailySale.length > 0 && dailySale.filter(data=>data.sum > 0)?
                        dailySale.map((item,index) =>
                        <>
                            <tr key={index}>
                                {/* <td className="text-center">
                                    <button className="btn btn-info btn-lg" 
                                    data-toggle="modal" data-target="#modalViewBill" 

                                    >
                                        Bill Detail
                                    </button>
                                </td> */}
                                <td>{months[item.month-1]}</td>
                                <td>{item.sum}</td>
                            </tr>

                        </> ) : 
                        <>
                            <tr>
                                <td className="text-center" colSpan={6}>No Data</td>
                            </tr>
                        </>
                    }</tbody>
            
                </table>
            </Template>
        </>
    )

}